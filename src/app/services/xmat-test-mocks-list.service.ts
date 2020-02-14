import {XmatTestRestService} from "./xmat-test-rest.service";
import {Injectable} from "@angular/core";
import {
    XmatMock,
    XmatMocksListService,
    XmatConstantsService
} from "ngx-mat-lib";

@Injectable()
export class XmatTestMocksListService extends XmatMocksListService {

    /**
     * HOWTO:
     * standard services
     *  {method: this._methodsKeys.GET, url: this._servicesUrls.serviceName, status: 200},
     *  services with url params such as /rest/myService/{someParam}
     *  {method: this._methodsKeys.GET, url: this._servicesUrls.myService + this._ds + this._paramsPlaceholder, status: 200}
     *  DEFAULT TIMEOUT IS 2000 ms (xmat)
     */
    private _ds = this._xmatConstants.ds;
    private _methodsKeys = this._xmatConstants.methodsKeys;
    private _mocksFolder = "./assets/services-mocks/";
    private _params = this._xmatConstants.paramsPlaceholder;
    private _remoteNode = location.protocol + this._ds + this._ds + location.hostname + ":3000" + this._ds;
    private _servicesUrls = this._rest.servicesUrls;

    // Mocks default timeout (500) see SfcMockService
    private _mocksList: XmatMock[] = [
        {
            method: this._methodsKeys.GET,
            url: this._servicesUrls.accountsByGid,
        },
        {
            method: this._methodsKeys.GET,
            url: this._servicesUrls.getOuRoles
        },
        {
            method: this._methodsKeys.GET,
            url: this._servicesUrls.getOuUsers
        },
        {
            method: this._methodsKeys.GET,
            url: this._servicesUrls.getRequestsByUid
        },
        {
            method: this._methodsKeys.PATCH,
            url: this._servicesUrls.testPatch
        }
    ];

    constructor(private _xmatConstants: XmatConstantsService,
                private _rest: XmatTestRestService) {

        super();

        this.set(this._mocksList);

    }

}
