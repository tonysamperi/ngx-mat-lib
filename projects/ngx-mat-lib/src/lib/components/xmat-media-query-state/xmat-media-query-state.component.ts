import { Component, OnDestroy, Injectable } from "@angular/core";
import {
    MediaChange,
    MediaObserver,
    BreakPoint,
    BreakPointRegistry,
    ɵMatchMedia,
    PrintHook
} from "@angular/flex-layout";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable()
export class XmatMediaService extends MediaObserver {

    public bps: BreakPoint[];

    constructor(breakpoints: BreakPointRegistry, matchMedia: ɵMatchMedia, hook: PrintHook) {
        super(breakpoints, matchMedia, hook);
        this.bps = breakpoints.items;
    }
}

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

    constructor(mediaSrv: XmatMediaService) {
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
