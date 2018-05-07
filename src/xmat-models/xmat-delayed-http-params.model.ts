import {HttpParams} from "@angular/common/http";
export class XmatDelayedHttpParams extends HttpParams {
    constructor(public delay: number = 0) {
        super();
        this.delay >= 0 || (this.delay = 0);
    }
}
