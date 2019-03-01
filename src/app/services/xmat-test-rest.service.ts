import {Injectable, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    XmatHttpConfig,
    XmatRestVerbs,
    XmatConstantsService,
    XmatRestService
} from "ngx-mat-lib";


// tslint:disable-next-line:naming-convention
const _injector = Injector.create({providers: [{provide: XmatConstantsService, deps: []}]});
// tslint:disable-next-line:naming-convention
const _sfcConstants = _injector.get(XmatConstantsService);
// tslint:disable-next-line:naming-convention
const _param = _sfcConstants.paramsPlaceholder;

@Injectable()
export class XmatTestRestService extends XmatRestService {

    readonly servicesUrls = {
        accountsByGid: `${this._restBaseUrl}people/${_param}/accounts`,
        getOuUsers: `${this._restBaseUrl}ou/${_param}/${_param}/people`,
        getOuRoles: `${this._restBaseUrl}ou/${_param}/${_param}/roles`,
        getRequestsByUid: `${this._restBaseUrl}requests/subject/${_param}`,
        getUser: `${this._restBaseUrl}user`
    };

    readonly servicesConfigs = {
        accountsByGid: {
            get: (gid: string, param: string = ""): XmatHttpConfig => {
                const url = this.servicesUrls.accountsByGid.replace(_param, gid);
                return this._generateHttpConfig(XmatRestVerbs.GET, url + this._ds + param);
            },
            put: (gid: string, param: string = ""): XmatHttpConfig => {
                const url = this.servicesUrls.accountsByGid.replace(_param, gid);
                return this._generateHttpConfig(XmatRestVerbs.PUT, url + this._ds + param);
            }
        },
        getOuUsers: (p1: string, p2: string): XmatHttpConfig => {
            let url = this.servicesUrls.getOuUsers.replace(_param, p1);
            url = url.replace(_param, p2);
            return this._generateHttpConfig(XmatRestVerbs.GET, url);
        },
        getOuRoles: (p1: string, p2: string): XmatHttpConfig => {
            let url = this.servicesUrls.getOuRoles.replace(_param, p1);
            url = url.replace(_param, p2);
            return this._generateHttpConfig(XmatRestVerbs.GET, url);
        },
        getRequestsByUid: (uid: string): XmatHttpConfig => {
            return this._generateHttpConfig(XmatRestVerbs.GET, this.servicesUrls.getRequestsByUid.replace(_param, uid));
        },
        getUser: (): XmatHttpConfig => {
            return this._generateHttpConfig(XmatRestVerbs.GET, this.servicesUrls.getUser);
        }
    };

    constructor(http: HttpClient,
                sfcConstants: XmatConstantsService) {

        super(http, sfcConstants);

    }

}


