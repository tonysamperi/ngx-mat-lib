import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {SpinnerState} from "./spinner-state.model";
import {XmatGlobalSpinnerService} from "./xmat-global-spinner.service";
import "rxjs/add/operator/delay";

@Component({
    selector: "xmat-global-spinner",
    // templateUrl: "../tpl/xmat-global-spinner.component.html",
    template: `
        <div class="xmat-global-spinner" *ngIf="showSpinner">
            <mat-progress-spinner mode="indeterminate" diameter="100"></mat-progress-spinner>
        </div>
    `,
    styleUrls: ["../scss/xmat-global-spinner.component.scss"]
})

export class XmatGlobalSpinnerComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    showSpinner: boolean = false;

    constructor(private _spinnerService: XmatGlobalSpinnerService) {

    }

    ngOnInit() {
        /**
         * The delay prevents the "ExpressionHasChangedAfterCheck" error
         */
        this.subscription = this._spinnerService.spinnerState.delay(0).subscribe((state: SpinnerState) => {
            this.showSpinner = state.show;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}