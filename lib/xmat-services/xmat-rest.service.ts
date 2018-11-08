import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatHttpConfig, XmatDynamicRestVerbsRef, XmatRestVerbs} from "../xmat-models/index";

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

    constructor(protected _http: HttpClient,
                protected _xmatConstants: XmatConstantsService) {

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
}


