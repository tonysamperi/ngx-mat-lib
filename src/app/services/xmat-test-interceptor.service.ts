import {Injectable} from "@angular/core";
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {timer} from "rxjs/observable/timer";
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
                console.info("SfcInterceptorService: preDelay found", request.params.preDelay);
                preDelay = request.params.preDelay;
            }
            if (request.params.preDelay > 0) {
                console.info("SfcInterceptorService: postDelay found", request.params.postDelay);
                postDelay = request.params.postDelay > 0 ? request.params.postDelay : 0;

            }
        }

        return timer(preDelay).switchMap(() => {
            return next.handle(request).delay(postDelay)
            .do((event: any) => {
                console.info("RESPONSE EVENT?", event);
            });
        });

    }
}
