import {Component, Inject} from "@angular/core";
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from "@angular/material";
import {XmatSnackBarData} from "./xmat-snack-bar-data.model";

@Component({
    selector: "xmat-snack-bar",
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
        if (typeof this.data.actionCallback === typeof isNaN) {
            this.data.actionCallback();
        }
        this.snackBarRef.dismiss();
    }
}
