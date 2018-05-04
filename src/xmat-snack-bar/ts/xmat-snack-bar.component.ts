import {Component, Inject} from "@angular/core";
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from "@angular/material";
import {XmatSnackBarData} from "./xmat-snack-bar-data.model";

const noop = () => {

};

@Component({
    selector: "xmat-snack-bar",
    // templateUrl: "../tpl/xmat-snack-bar.component.html",
    template: `
        <div class="xmat-snack-bar mat-simple-snackbar">
            {{data.message}}
            <button mat-button class="mat-simple-snackbar-action"
                    *ngIf="data.showAction"
                    (click)="closeSnack()">
                {{data.actionText}}
            </button>
        </div>
    `,
    styleUrls: ["../scss/xmat-snack-bar.component.scss"]
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