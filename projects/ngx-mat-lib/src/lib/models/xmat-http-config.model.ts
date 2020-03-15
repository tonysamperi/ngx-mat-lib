import {HttpParams} from "@angular/common/http";
import {XmatRestVerbs} from "./xmat-rest-verbs.model";
import {XmatHttpParams} from "./xmat-http-params.model";

export interface XmatHttpConfig {
    method: XmatRestVerbs;
    url: string;
    data?: object;
    queryable: boolean;
    params?: HttpParams | XmatHttpParams | any;
}
