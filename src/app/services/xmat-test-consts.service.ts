import {Injectable} from "@angular/core";
import {
    XmatConstantsService,
    XmatDynamicRestVerbsRef,
    XmatSelect,
    XmatGenericObject
} from "ngx-mat-lib";

@Injectable()
export class XmatTestConstsService extends XmatConstantsService {

    restBaseUrl: string = "./rest";

    constructor() {
        super();
    }

}
