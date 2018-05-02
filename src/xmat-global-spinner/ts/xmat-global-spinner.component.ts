import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {SpinnerState} from "./spinner-state.model";
import {XmatGlobalSpinnerService} from "./ubi-global-spinner.service";

@Component({
    selector: "ubi-global-spinner",
    templateUrl: "../tpl/ubi-global-spinner.component.html",
    styleUrls: ["../scss/ubi-global-spinner.component.scss"]
})

export class XmatGlobalSpinnerComponent implements OnInit {

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