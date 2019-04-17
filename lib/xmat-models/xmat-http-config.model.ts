import {HttpParams} from "@angular/common/http";
import {XmatHttpParams} from "./xmat-http-params.model";
import {XmatRestVerbs} from "./xmat-rest-verbs.model";

export interface XmatHttpConfig {
    method: XmatRestVerbs;
    url: string;
    data?: object;
    queryable: boolean;
    params?: HttpParams | XmatHttpParams | any;
}
