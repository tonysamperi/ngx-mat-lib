import {Component, OnDestroy} from "@angular/core";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
//
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: "xmat-media-query-state",
    template: `
        <div class="mqInfo">
            <p>Active MediaQuery(s):</p>
            <ul>
                <li *ngFor="let change of medias">
                    {{change.mqAlias}} = {{change.mediaQuery}}
                </li>
            </ul>
        </div>
    `,
    styleUrls: [],
})
export class XmatMediaQueryStateComponent implements OnDestroy {

    medias: MediaChange[];

    private _subsCtrl$: Subject<void> = new Subject<void>();

    constructor(mediaSrv: MediaObserver) {
        mediaSrv.asObservable()
        .pipe(takeUntil(this._subsCtrl$))
        .subscribe((changes: MediaChange[]) => {
            this.medias = changes;
        });
    }

    ngOnDestroy(): void {
        this._subsCtrl$.next();
    }
}
