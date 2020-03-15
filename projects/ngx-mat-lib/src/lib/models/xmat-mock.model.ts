import {Observable} from "rxjs";
import {HttpRequest, HttpHandler} from "@angular/common/http";

/**
 * HOW TO
 *
 * url: url of the rest - generally found in xmatRestService
 * method: method of the call - generally found in xmatRestService
 * status: the status to return - 200, 400, 403 etc...
 * body: optional body to avoid getting a mock from the default folder
 */

export interface XmatMock {
    body?: object;
    customMethod?: string;
    customUrl?: string;
    result?: boolean;
    method?: string;
    status?: number;
    timeout?: number;
    url: string;
}

export type XmatMockCallback<T = any, U = any> =
    (request: HttpRequest<U>, next: HttpHandler, params: string[], queryString?: string) => Observable<T>;

export interface XmatMocksCallbacks<T = any> {
    [key: string]: XmatMockCallback<T>;
}
