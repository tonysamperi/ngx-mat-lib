import {Component, Inject} from "@angular/core";
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from "@angular/material";
import {XmatSnackBarData} from "./ubi-snack-bar-data.model";

const noop = () => {

};

@Component({
    selector: "ubi-snack-bar",
    templateUrl: "../tpl/ubi-snack-bar.component.html",
    styleUrls: ["../scss/ubi-snack-bar.component.scss"]
})
export class XmatSnackBarComponent {

    constructor(private snackBarRef: MatSnackBarRef<XmatSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: XmatSnackBarData) {
        this.data.showAction = this.data.showAction && !!this.data.actionText;
    }

    closeSnack() {
        if (typeof this.data.actionCallback === typeof noop) {
            this.data.actionCallback();
        }
        this.snackBarRef.dismiss();
    }
}