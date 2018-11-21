import {Injectable} from "@angular/core";
import {XmatTestMocksListService} from "./xmat-test-mocks-list.service";
import {
    XmatMockService,
    XmatConstantsService
} from "ngx-mat-lib";

@Injectable()
export class XmatTestMockService extends XmatMockService {


    // Overriding XmatMockService vars
    protected _logEnabled: boolean = !0;
    protected _defaultMockDelay: number = 500;

    constructor(protected _sfcConstants: XmatConstantsService,
                protected _sfcMocksList: XmatTestMocksListService) {

        super(_sfcConstants, _sfcMocksList);

    }

}
