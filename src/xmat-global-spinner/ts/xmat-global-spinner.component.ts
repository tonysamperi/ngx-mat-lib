import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {SpinnerState} from "./spinner-state.model";
import {XmatGlobalSpinnerService} from "./xmat-global-spinner.service";
import 'rxjs/add/operator/delay';

@Component({
    selector: "xmat-global-spinner",
    templateUrl: "../tpl/xmat-global-spinner.component.html",
    styleUrls: ["../scss/xmat-global-spinner.component.scss"]
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