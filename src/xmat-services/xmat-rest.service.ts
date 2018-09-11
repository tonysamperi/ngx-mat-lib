import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatHttpConfig} from "../xmat-models/index";

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

    protected _restBaseUrl = this._xmatConstants.restBaseUrl;
    protected _ds = this._xmatConstants.ds;

    protected readonly httpMethods = {
        get: "GET",
        post: "POST",
        del: "DELETE",
        put: "PUT"
    };

    // Sample data
    public readonly servicesUrls = {
        /**
         *  myServiceA: "my-service-a"
         *  myServiceA: "my-service-b"
         */
    };

    public readonly servicesConfigs = {
        /**
         * myServiceA: {
         *     get: (): XmatHttpConfig => {
         *         return this._generateHttpConfig(this.httpMethods.get, this.servicesUrls.myServiceA, true);
         *     },
         *     post: (): XmatHttpConfig => {
         *         return this._generateHttpConfig(this.httpMethods.post, this.servicesUrls.myServiceA);
         *     }
         * },
         * myServiceB: (): XmatHttpConfig => {
         *     return this._generateHttpConfig(this.httpMethods.get, this.servicesUrls.myServiceA, true);
         * }
         */
    };

    constructor(protected _http: HttpClient,
                protected _xmatConstants: XmatConstantsService) {

    }

    protected _generateHttpConfig(method: string = this.httpMethods.get, url: string = "", queryable: boolean = false): XmatHttpConfig {
        url = this._xmatConstants.removeTrailingSlash(url);
        return {
            method: method,
            url: url,
            data: void 0,
            queryable: queryable
        };
    }

    $http<T>(config: XmatHttpConfig = this._generateHttpConfig()): Observable<T> {
        if (!config.method) {
            config.method = this.httpMethods.get;
        }
        if (!config.url) {
            console.error("Error: [$http:badconfig]", config);
            return new Observable();
        }
        switch (config.method) {
            case this.httpMethods.get:
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
            case this.httpMethods.post:
                return this._http.post<T>(config.url, config.data);
            case this.httpMethods.del:
                return this._http.delete<T>(config.url, config.data);
            case this.httpMethods.put:
                return this._http.put<T>(config.url, config.data);

            default:
                console.error("Error: [XmatRest:badmethod]", this.$http.arguments);
                return new Observable();
        }
    }
}


