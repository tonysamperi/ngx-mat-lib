import {Injectable} from "@angular/core";
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable, timer} from "rxjs";
import {switchMap, tap, delay} from "rxjs/operators";
import {XmatHttpParams} from "ngx-mat-lib";

@Injectable()
export class XmatTestInterceptorService {

    private _ignoredUrls: string[] = [];

    // NOTE: ALL AMOUNTS ARE IN MILLISECONDS

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.info("REQUEST INTERCEPTED", request);
        let preDelay = 0;
        let postDelay = 0;
        if (request.params instanceof XmatHttpParams) {
            if (request.params.preDelay > 0) {
                console.info("XmatInterceptorService: preDelay found", request.params.preDelay);
                preDelay = request.params.preDelay;
            }
            if (request.params.postDelay > 0) {
                console.info("XmatInterceptorService: postDelay found", request.params.postDelay);
                postDelay = request.params.postDelay;

            }
        }

        return timer(preDelay).pipe(switchMap(() => {
            return next.handle(request)
            .pipe(delay(postDelay))
            .pipe(tap((event: any) => {
                console.info("RESPONSE EVENT?", event);
            }));
        }));

    }
}
