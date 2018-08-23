import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {timer} from "rxjs/observable/timer";
import {XmatConstantsService} from "../../xmat-services/xmat-constants.service";
import {XmatMock} from "./xmat-mock.model";
import {XmatMocksListService} from "./xmat-mocks-list.service";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import * as _ from "lodash";

@Injectable()
export class XmatMockService implements HttpInterceptor {

    private _defaultResponseBody = {data: void 0, message: "forbidden"};
    private readonly _ds = this._xmatConstants.ds;
    private _fileEndings = this._xmatConstants.mocksEndings;
    private readonly _fileNameSpace = this._xmatConstants.fileNameSpace;
    private readonly _mocksBaseUrl: string = this._xmatConstants.mocksBaseUrl;
    private readonly _methodsKeys: object = this._xmatConstants.methodsKeys;

    private _mocks: object = {};

    private readonly _paramsPlaceholder = this._xmatConstants.paramsPlaceholder;
    private readonly _qm: string = "?";
    private readonly _queryUrlParam = this._xmatConstants.queryUrlParam;
    private readonly _restBaseUrl: string = this._xmatConstants.restBaseUrl;

    // Override these from extended class
    protected _defaultMockDelay: number = 2500;
    protected _logEnabled: boolean = true;

    constructor(protected _xmatConstants: XmatConstantsService,
                protected _xmatMocksList: XmatMocksListService) {

        const mocks = this._xmatMocksList.get();
        _.each(mocks, (mock) => {
            this.pushMockHandler(mock);
        });
    }

    // Here the magic happens
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!(<any>window).times[request.url]) {
            const startTime = (<any>window).times[request.url];
            const finalTime = Date.now();
            !!this._logEnabled && console.info(`SECOND INTERCEPTOR after ${(finalTime - startTime)} ms`);
        }
        // Separate query string from the rest
        const urlParts = request.url.split(this._qm);
        let mockKey = this._methodsKeys[request.method] + urlParts[0];

        // Checks for non parametric URL
        if (this.mockExists(mockKey)) {
            return this._mocks[mockKey](request, next, urlParts[1]);
        }
        const urlParams = this.extractUrlParams(urlParts[0]);
        if (Array.isArray(urlParams) && urlParams.length) {
            for (let i = 1; i <= urlParams.length; i++) {
                const validUrlParts = _.slice(urlParams, urlParams.length - i);
                mockKey = mockKey.substr(0, mockKey.lastIndexOf(this._ds));
                if (this.mockExists(mockKey + this._ds + this._paramsPlaceholder)) {
                    return this._mocks[mockKey + this._ds + this._paramsPlaceholder](request, next, validUrlParts, urlParts[1]);
                }
                const middleParam = mockKey.substr(mockKey.lastIndexOf(this._ds) + 1);
                const middleParamKey = mockKey.replace(middleParam, this._paramsPlaceholder) + this._ds + validUrlParts;
                if (this.mockExists(middleParamKey)) {
                    return this._mocks[middleParamKey](request, next, [middleParam].concat(validUrlParts), urlParts[1]);
                }
            }
        }
        return next.handle(request);

    }

    // Private methods
    private extractUrlParams(serviceUrl: string) {
        /**
         * E.G. serviceUrl = "/rest/cd/property-store/5/id";
         * cleanUrl = "property-store/5/id"
         * urlParams = [
         *      "property-store",
         *      "5",
         *      "id"
         * ]
         */
        const cleanUrl = serviceUrl.replace(this._restBaseUrl, "");
        const urlParams = cleanUrl.split(this._ds);
        urlParams.shift();
        // If true it means there was at least one param
        if (urlParams.length > 0) {
            return urlParams;
        }
        return void 0;
    }


    private mockExists(mockKey) {
        return !!this._mocks[mockKey] && typeof this._mocks[mockKey] === typeof this._xmatConstants.noop;
    }

    private generateJsonUrl(serviceUrl: string, methodKey: string, fileSuffix: string = "", status: string = this._fileEndings.ok) {
        const serviceKey = serviceUrl.substr(this._restBaseUrl.length).split(this._ds + this._paramsPlaceholder)[0];
        const serviceFolder = serviceKey.split(this._ds)[0];
        const fileName = serviceKey.split(this._ds).join(this._fileNameSpace);
        return this._mocksBaseUrl + serviceFolder + this._ds + methodKey + fileName + fileSuffix + status;
    }

    private pushMockHandler(mock: XmatMock) {
        /**
         * TODO
         * Possible evolution: custom callback in mock object
         */
        !!mock.status || (mock.status = 200);
        !!mock.body || (mock.body = this._defaultResponseBody);
        const mockKey = mock.method + mock.url;
        this._mocks[mockKey] = (request, next, params: string[] = [], queryString) => {
            if (mock.status !== 200) {
                return new Observable(observer => {
                    const customResponse = new HttpResponse({status: mock.status, body: mock.body});
                    observer.error(customResponse);
                    observer.complete();
                });

            }
            let mockRequest;
            if (!!mock.customUrl) {

                // If params placeholder is in custom URL, params are concat to url with slashes
                const url = mock.customUrl.replace(this._paramsPlaceholder, params.join(this._ds));
                mockRequest = request.clone({
                    url: url + (!!queryString ? this._qm + queryString : ""),
                    method: mock.customMethod ? mock.customMethod : url.indexOf(".json") >= 0 ? "GET" : request.method
                });
            }
            else {
                let suffix = "";
                _.each(params, (param) => {
                    suffix += this._fileNameSpace + param;
                });
                const ending = mock.result === false ? this._fileEndings.ko : this._fileEndings.ok;
                const method = this._methodsKeys[request.method];
                const url = this.generateJsonUrl(mock.url, method, suffix, ending);
                const queriedUrl = this.generateJsonUrl(mock.url, method, this._fileNameSpace + this._queryUrlParam, ending);
                mockRequest = request.clone({
                    url: request.urlWithParams.indexOf(this._queryUrlParam) > 0 ? queriedUrl : url,
                    method: "GET"
                });
            }
            typeof mock.timeout === typeof 0 && mock.timeout >= 0 || (mock.timeout = this._defaultMockDelay);
            const delay = timer(mock.timeout);
            const start = Date.now();
            return delay.switchMap(() => next.handle(mockRequest))
            .do((event: HttpResponse<any>) => {
                if (event.type === HttpEventType.Response) {
                    const elapsed = Date.now() - start;
                    !!this._logEnabled && console.log(`Request for mocked ${request.urlWithParams} took ${elapsed} ms.`);
                }
            });
        };
    }
}

/**
 * TODO: ERROR INTERCEPTOR
 * @Injectable()
 * export class ErrorInterceptor implements HttpInterceptor {
 *
 *    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 *        return next.handle(req).do(event => {
 *        }, err => {
 *           if (err instanceof HttpErrorResponse && err.status == 401) {
 *               // handle 401 errors
 *          }
 *     });
 *    }
 * }
 */
