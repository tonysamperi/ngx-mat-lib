import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {SpinnerState} from "..//xmat-models/xmat-spinner-state.model";
import {XmatGlobalSpinnerService} from "./xmat-global-spinner.service";
import {delay} from "rxjs/operators";

@Component({
    selector: "xmat-global-spinner",
    templateUrl: "./xmat-global-spinner.component.html",
    styleUrls: ["./xmat-global-spinner.component.scss"]
})

export class XmatGlobalSpinnerComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    showSpinner: boolean = false;

    constructor(private _spinnerService: XmatGlobalSpinnerService) {

    }

    ngOnInit(): void {
        /**
         * The delay prevents the "ExpressionHasChangedAfterCheck" error
         */
        this.subscription = this._spinnerService.spinnerState
        .pipe(delay(0))
        .subscribe((state: SpinnerState) => {
            this.showSpinner = state.show;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
