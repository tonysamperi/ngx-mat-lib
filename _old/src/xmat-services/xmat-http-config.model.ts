import {HttpParams} from "@angular/common/http";
import {XmatDelayedHttpParams} from "../xmat-models/xmat-delayed-http-params.model";

export interface XmatHttpConfig {
    method: string,
    url: string,
    data?: object,
    queryable: boolean,
    params?: HttpParams | XmatDelayedHttpParams | any
}