import {HttpParams} from "@angular/common/http";
import {DelayedHttpParams} from "../../../models/DelayedHttpParams.model";

export interface XmatHttpConfig {
    method: string,
    url: string,
    data: object,
    queryable: boolean,
    params?: HttpParams | DelayedHttpParams | any
}