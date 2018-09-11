import {HttpParams} from "@angular/common/http";
import {XmatDelayedHttpParams} from "./xmat-delayed-http-params.model";
import {XmatRestVerbs} from "./xmat-rest-verbs.model";

export interface XmatHttpConfig {
    method: XmatRestVerbs;
    url: string;
    data?: object;
    queryable: boolean;
    params?: HttpParams | XmatDelayedHttpParams | any;
}
