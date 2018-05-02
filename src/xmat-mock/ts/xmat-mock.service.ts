import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {timer} from "rxjs/observable/timer";
import {XmatConstantsService} from "../../xmat-services/xmat-constants.service";
import {XmatMock} from "./xmat-mock.model";
import {XmatMocksListService} from "./xmat-mocks-list.service";
import * as _ from "lodash";

@Injectable()
export class XmatMockService implements HttpInterceptor {

    private _defaultResponseBody = {data: void 0, message: "forbidden"};
    private readonly _ds = this._ubiConstants.ds;
    private _fileEndings = this._ubiConstants.mocksEndings;
    private readonly _fileNameSpace = this._ubiConstants.fileNameSpace;
    private readonly _mocksBaseUrl: string = this._ubiConstants.mocksBaseUrl;
    private readonly _methodsKeys: object = this._ubiConstants.methodsKeys;

    private _mocks: object = {};

    private readonly _paramsPlaceholder = this._ubiConstants.paramsPlaceholder;
    private readonly _qm: string = "?";
    private readonly _queryUrlParam = this._ubiConstants.queryUrlParam;
    private readonly _restBaseUrl: string = this._ubiConstants.restBaseUrl;

    constructor(protected _ubiConstants: XmatConstantsService,
                protected _ubiMocksList: XmatMocksListService) {

        let mocks = this._ubiMocksList.get();
        _.each(mocks, (mock) => {
            this.pushMockHandler(mock);
        });
    }

    //Here the magic happens
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!(<any>window).times[request.url]) {
            let startTime = (<any>window).times[request.url];
            let finalTime = Date.now();
            console.info(`SECOND INTERCEPTOR after ${(finalTime - startTime)} ms`);
        }
        //Separate query string from the rest
        let urlParts = request.url.split(this._qm);
        let mockKey = this._methodsKeys[request.method] + urlParts[0];

        //Checks for non parametric URL
        if (this.mockExists(mockKey)) {
            return this._mocks[mockKey](request, next, urlParts[1]);
        }
        let urlParams = this.extractUrlParams(urlParts[0]);
        if (Array.isArray(urlParams) && urlParams.length) {
            for (let i = 1; i <= urlParams.length; i++) {
                mockKey = mockKey.substr(0, mockKey.lastIndexOf(this._ds));
                if (this.mockExists(mockKey + this._ds + this._paramsPlaceholder)) {
                    let validParams = urlParams.splice(urlParams.length - i, i);
                    return this._mocks[mockKey + this._ds + this._paramsPlaceholder](request, next, validParams, urlParts[1]);
                }
            }
        }
        return next.handle(request);

    }

    //Private methods
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
        let cleanUrl = serviceUrl.replace(this._restBaseUrl, "");
        let urlParams = cleanUrl.split(this._ds);
        urlParams.shift();
        //If true it means there was at least one param
        if (urlParams.length > 0) {
            return urlParams;
        }
        return void 0;
    }


    private mockExists(mockKey) {
        return !!this._mocks[mockKey] && typeof this._mocks[mockKey] === typeof this._ubiConstants.noop;
    }

    private generateJsonUrl(serviceUrl: string, methodKey: string, fileSuffix: string = "", status: string = this._fileEndings.ok) {
        let serviceKey = serviceUrl.substr(this._restBaseUrl.length).split(this._ds + this._paramsPlaceholder)[0];
        let serviceFolder = serviceKey.split(this._ds)[0];
        let fileName = serviceKey.split(this._ds).join(this._fileNameSpace);
        return this._mocksBaseUrl + serviceFolder + this._ds + methodKey + fileName + fileSuffix + status;
    }

    private pushMockHandler(mock: XmatMock) {
        /**
         * TODO
         * Possible evolution: custom callback in mock object
         */
        !!mock.status || (mock.status = 200);
        !!mock.body || (mock.body = this._defaultResponseBody);
        typeof mock.timeout === typeof 0 && mock.timeout >= 0 || (mock.timeout = 2500);
        let mockKey = mock.method + mock.url;
        this._mocks[mockKey] = (request, next, params: string[] = [], queryString) => {
            if (mock.status !== 200) {
                return new Observable(observer => {
                    let customResponse = new HttpResponse({status: mock.status, body: mock.body});
                    observer.error(customResponse);
                    observer.complete();
                });

            }
            let mockRequest;
            if (!!mock.customUrl) {

                //If params placeholder is in custom URL, params are concat to url with slashes
                let url = mock.customUrl.replace(this._paramsPlaceholder, params.join(this._ds));
                mockRequest = request.clone({
                    url: url + (!!queryString ? this._qm + queryString : "")
                });
            }
            else {
                let suffix = "";
                _.each(params, (param) => {
                    suffix += this._fileNameSpace + param;
                });
                let ending = mock.result === false ? this._fileEndings.ko : this._fileEndings.ok;
                let url = this.generateJsonUrl(mock.url, this._methodsKeys[request.method], suffix, ending);
                let queriedUrl = this.generateJsonUrl(mock.url, this._methodsKeys[request.method], this._fileNameSpace + this._queryUrlParam, ending);
                mockRequest = request.clone({
                    url: request.urlWithParams.indexOf(this._queryUrlParam) > 0 ? queriedUrl : url,
                    method: "GET"
                });
            }
            //return next.handle(jsonRequest);
            const delay = timer(mock.timeout);
            const start = Date.now();
            return delay.switchMap(() => next.handle(mockRequest))
                .do((event: HttpResponse<any>) => {
                    if (event.type == HttpEventType.Response) {
                        const elapsed = Date.now() - start;
                        // console.log(`Request for ${jsonRequest.urlWithParams} took ${elapsed} ms.`, event);
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