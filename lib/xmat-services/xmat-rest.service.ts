import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatHttpConfig, XmatRestVerbs, XmatFile, XmatResponseTypes} from "../xmat-models/index";

/**
 * UBI REST BY TONY SAMPERI
 * extend this file by adding a public "serviceUrls" variable
 * and optionally servicesConfigs
 *
 * CRUD-HTTP MAPPING
 * POST        Create        Crea una nuova risorsa
 * GET        Read        Ottiene una risorsa esistente
 * PUT        Update    Aggiorna una risorsa o ne modifica lo stato
 * DELETE    Delete    Elimina una risorsa
 */

@Injectable()
export class XmatRestService {

    // Sample data
    readonly servicesUrls = {
        /**
         *  myServiceA: "my-service-a"
         *  myServiceA: "my-service-b"
         */
    };

    readonly servicesConfigs = {
        /**
         * myServiceA: {
         *     get: (): XmatHttpConfig => {
         *         return this._generateHttpConfig(XmatRestVerbs.GET, this.servicesUrls.myServiceA, true);
         *     },
         *     post: (): XmatHttpConfig => {
         *         return this._generateHttpConfig(XmatRestVerbs.POST, this.servicesUrls.myServiceA);
         *     }
         * },
         * myServiceB: (): XmatHttpConfig => {
         *     return this._generateHttpConfig(XmatRestVerbs.GET, this.servicesUrls.myServiceA, true);
         * }
         */
    };

    protected _restBaseUrl = this._xmatConstants.restBaseUrl;
    protected _ds = this._xmatConstants.ds;

    constructor(protected _http: HttpClient,
                protected _xmatConstants: XmatConstantsService) {

    }

    downloadBlobFromUrl(file: XmatFile): void {
        this.getBlobFromUrl(file).subscribe((results: Blob) => {
            // IE DOESN'T SUPPORT TRIGGERING SO WE START DOWNLOADING WITH THIS PORKAROUND
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(results, file.fileName);
            }
            else {
                const unsafeUrl = URL.createObjectURL(results);
                const linkEl = document.createElement("a");
                linkEl.href = unsafeUrl;
                linkEl.download = file.fileName;

                document.body.appendChild(linkEl);
                linkEl.click();
                document.body.removeChild(linkEl);
            }
        });
    }

    getBlobFromUrl(file: XmatFile): Observable<Blob> {
        if (!file || !file.url) {
            console.error("XmatRest: invalid XmatFile provided!", file);
            return void 0;
        }
        // Use a default fileName if not set
        if (!file.fileName || !file.fileName.length) {
            const ext = file.url.substr(file.url.lastIndexOf("."));
            file.fileName = `xmat-document${ext}`;
        }

        return this._http.get(file.url, {
            responseType: XmatResponseTypes.blob
        });
    }

    $http<T>(config: XmatHttpConfig = this._generateHttpConfig()): Observable<T> {
        if (!config.method) {
            config.method = XmatRestVerbs.GET;
        }
        if (!config.url) {
            console.error("Error: [$http:badconfig]", config);
            return new Observable();
        }
        switch (config.method) {
            case XmatRestVerbs.GET:
                let params = new HttpParams();
                /**
                 * Transform data in query params
                 */
                if (!!config.data) {
                    // Accepting 0, null, void 0 as empty params
                    if (this._xmatConstants.isStrictlyObject(config.data)) {
                        let key;
                        for (key in config.data) {
                            params = params.append(key, config.data[key]);
                        }
                    }
                    else {
                        console.warn("Error: [XmatRest:badparams]");
                    }
                }
                return this._http.get<T>(config.url, {params: params});
            case XmatRestVerbs.POST:
                return this._http.post<T>(config.url, config.data);
            case XmatRestVerbs.DELETE:
                return this._http.delete<T>(config.url, config.data);
            case XmatRestVerbs.PUT:
                return this._http.put<T>(config.url, config.data);

            default:
                console.error("Error: [XmatRest:badmethod]", this.$http.arguments);
                return new Observable();
        }
    }

    protected _generateHttpConfig(method: XmatRestVerbs = XmatRestVerbs.GET, url: string = "", queryable: boolean = false): XmatHttpConfig {
        url = this._xmatConstants.removeTrailingSlash(url);
        return <XmatHttpConfig>{
            method: method,
            url: url,
            data: void 0,
            queryable: queryable
        };
    }
}


