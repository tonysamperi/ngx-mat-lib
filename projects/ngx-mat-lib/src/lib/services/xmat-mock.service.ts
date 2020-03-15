import {Injectable} from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpEventType
} from "@angular/common/http";
//
import {
    XmatGenericObject,
    XmatLib,
    XmatMock,
    XmatMocksCallbacks,
    XmatRestVerbs
} from "../models/index";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatMocksListService} from "./xmat-mocks-list.service";
//
import {tap, switchMap} from "rxjs/operators";
import {Observable, timer} from "rxjs";
import {each} from "lodash";

@Injectable()
export class XmatMockService implements HttpInterceptor {

    protected _defaultResponseBody: XmatGenericObject = {data: void 0, message: "forbidden"};
    protected _fileEndings = this._xmatConstants.mocksEndings;
    protected _mocks: XmatMocksCallbacks = {};

    protected readonly _ds = this._xmatConstants.ds;
    protected readonly _fileNameSpace = this._xmatConstants.fileNameSpace;
    protected readonly _mocksBaseUrl: string = this._xmatConstants.mocksBaseUrl;
    protected readonly _paramsPlaceholder = this._xmatConstants.paramsPlaceholder;
    protected readonly _qm: string = "?";
    protected readonly _queryUrlParam = this._xmatConstants.queryUrlParam;
    protected readonly _restBaseUrl: string = this._xmatConstants.restBaseUrl;

    // Override these from extended class
    protected _defaultMockDelay: number = 2500;
    protected _logEnabled: boolean = true;

    constructor(protected _xmatConstants: XmatConstantsService,
                protected _xmatMocksList: XmatMocksListService) {

        const mocks = this._xmatMocksList.get();
        each(mocks, (mock) => {
            this._pushMockHandler(mock);
        });
    }

    // Here the magic happens
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!XmatLib.restTimes[request.url]) {
            const startTime = XmatLib.restTimes[request.url];
            const finalTime = Date.now();
            if (this._logEnabled) {
                console.info(`XmatMock: interceptor fired after ${(finalTime - startTime)} ms`);
                XmatLib.restTimes[request.url] = startTime;
            }
        }
        // Separate query string from the rest
        const urlParts = request.url.split(this._qm);
        const mockKey = request.method + urlParts[0];

        // Checks for non parametric URL
        if (this._mockExists(mockKey)) {
            this._logEnabled && console.info(`XmatMock: found mock with key ${mockKey}`);

            return this._mocks[mockKey](request, next, [], urlParts[1]);
        }
        const urlParams = this._extractUrlParams(urlParts[0]);
        if (Array.isArray(urlParams)) {
            const serviceName = urlParts[0].substr(this._restBaseUrl.length).split(this._ds).shift();
            const serviceBase = request.method + this._restBaseUrl + serviceName;
            let j = urlParams.length;
            while (--j >= 0) {
                const paramsBak = urlParams.slice();
                paramsBak[j] = this._paramsPlaceholder;
                let mixedKey = [serviceBase].concat(paramsBak).join(this._ds);
                if (this._mockExists(mixedKey)) {
                    this._logEnabled && console.info(`XmatMock: found mock with key ${mixedKey}`);
                    return this._mocks[mixedKey](request, next, urlParams.slice(j), urlParts[1]);
                }
                let k = j;
                while (--k >= 0) {
                    const paramsBakBak = paramsBak.slice();
                    paramsBakBak[k] = this._paramsPlaceholder;
                    mixedKey = [serviceBase].concat(paramsBakBak).join(this._ds);
                    if (this._mockExists(mixedKey)) {
                        this._logEnabled && console.info(`XmatMock: found mock with key ${mixedKey}`);
                        return this._mocks[mixedKey](request, next, urlParams.slice(k), urlParts[1]);
                    }
                }
            }
        }

        return next.handle(request);

    }

    // Private methods
    protected _extractUrlParams(serviceUrl: string) {
        /**
         * E.G. serviceUrl = "/rest/cd/property-store/5/id";
         * cleanUrl = "property-store/5/id"
         * urlParamsList = [
         *      "property-store",
         *      "5",
         *      "id"
         * ]
         */
        const cleanUrl = serviceUrl.replace(this._restBaseUrl, "");
        const urlParamsList = cleanUrl.split(this._ds);
        urlParamsList.shift();
        // If true it means there was at least one param
        if (urlParamsList.length > 0) {
            return urlParamsList;
        }
        return void 0;
    }

    protected _mockExists(mockKey) {
        return !!this._mocks[mockKey] && typeof this._mocks[mockKey] === typeof this._xmatConstants.noop;
    }

    protected _generateJsonUrl(serviceUrl: string, methodKey: string, fileSuffix: string = "", status: string = this._fileEndings.ok) {
        const serviceKey = serviceUrl.substr(this._restBaseUrl.length).split(this._ds + this._paramsPlaceholder)[0];
        const serviceFolder = serviceKey.split(this._ds)[0];
        const fileName = serviceKey.split(this._ds).join(this._fileNameSpace);
        return this._mocksBaseUrl + serviceFolder + this._ds + methodKey + fileName + fileSuffix + status;
    }

    protected _pushMockHandler(mock: XmatMock) {
        /**
         * TODO: Possible evolution: custom callback in mock object
         */
        !!mock.status || (mock.status = 200);
        !!mock.body || (mock.body = this._defaultResponseBody);
        const mockKey = mock.method + mock.url;
        this._mocks[mockKey] = (request: HttpRequest<any>, next: HttpHandler, params: string[] = [], queryString?: string): Observable<any> => {
            if (mock.status !== 200) {
                return new Observable(observer => {
                    const customResponse = new HttpResponse({status: mock.status, body: mock.body});
                    observer.error(customResponse);
                    observer.complete();
                });

            }
            let mockRequest;
            if (!!mock.customUrl) {
                if (this._logEnabled) {
                    console.info(`XmatMock: calling ${mock.customUrl}`);
                }
                // If params placeholder is in custom URL, params are concat to url with slashes
                const url = mock.customUrl.replace(this._paramsPlaceholder, params.join(this._ds));
                mockRequest = request.clone({
                    url: url + (!!queryString ? this._qm + queryString : ""),
                    method: mock.customMethod ? mock.customMethod : url.indexOf(".json") >= 0 ? XmatRestVerbs.GET : request.method
                });
            }
            else {
                let fileNameSuffix = "";
                each(params, (param) => {
                    fileNameSuffix += this._fileNameSpace + param;
                });
                const ending = mock.result === false ? this._fileEndings.ko : this._fileEndings.ok;
                const methodKey = `${XmatRestVerbs[request.method]}-`;
                const url = this._generateJsonUrl(mock.url, methodKey, fileNameSuffix, ending);
                const queriedUrl = this._generateJsonUrl(mock.url, methodKey, this._fileNameSpace + this._queryUrlParam, ending);
                mockRequest = request.clone({
                    url: request.urlWithParams.indexOf(this._queryUrlParam) > 0 ? queriedUrl : url,
                    method: XmatRestVerbs.GET
                });
            }
            if (this._logEnabled) {
                console.info(`XmatMock: calling ${mockRequest.url}`);
            }
            typeof mock.timeout === typeof 0 && mock.timeout >= 0 || (mock.timeout = this._defaultMockDelay);
            const delay = timer(mock.timeout);
            const start = XmatLib.restTimes[request.url] || Date.now();
            return delay.pipe(switchMap(() => next.handle(mockRequest)),
                tap((event: HttpResponse<any>) => {
                    if (event.type === HttpEventType.Response) {
                        const elapsed = Date.now() - start;
                        !!this._logEnabled && console.log(`XmatMock: request for mocked ${request.urlWithParams} took ${elapsed} ms.`);
                    }
                }));
        };
    }
}
