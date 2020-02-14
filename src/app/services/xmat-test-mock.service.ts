import {Injectable} from "@angular/core";
import {XmatTestMocksListService} from "./xmat-test-mocks-list.service";
import {
    XmatMockService,
    XmatConstantsService
} from "ngx-mat-lib";

@Injectable()
export class XmatTestMockService extends XmatMockService {


    // Overriding XmatMockService vars
    protected _logEnabled: boolean = !1;
    protected _defaultMockDelay: number = 500;

    constructor(protected _xmatConstants: XmatConstantsService,
                protected _xmatMocksList: XmatTestMocksListService) {

        super(_xmatConstants, _xmatMocksList);

    }

}
