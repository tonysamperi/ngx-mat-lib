import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {XmatConfirmDialogData} from "./xmat-confirm-dialog.model";

@Component({
    selector: "xmat-confirm-dialog",
    styles: [
        "div[mat-dialog-actions] {justify-content: space-between; display: flex;}"
    ],
    templateUrl: "../tpl/xmat-confirm-dialog.component.html"
})
export class XmatConfirmDialogComponent {

    /**
     * TODO: add dynamic template binding
     * that would be really cool and reusable
     */
    constructor(private _dialogRef: MatDialogRef<XmatConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: XmatConfirmDialogData) {

    }

    onNoClick(): void {
        this._dialogRef.close(false);
    }

    onYesClick(): void {
        this._dialogRef.close(true);
    }
}
