import {HttpParams} from "@angular/common/http";

export class XmatHttpParams extends HttpParams {
    constructor(public preDelay: number = 0, public postDelay: number = 0) {
        super();
        this.preDelay >= 0 || (this.preDelay = 0);
        this.postDelay >= 0 || (this.postDelay = 0);
    }
}
