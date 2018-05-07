import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: "xmat-confirm-dialog",
    templateUrl: "../tpl/xmat-confirm-dialog.component.html",
})
export class XmatConfirmDialogComponent {

    /**
     * TODO: add dynamic template binding
     * that would be really cool and reusable
     */
    constructor(private _dialogRef: MatDialogRef<XmatConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    onNoClick(): void {
        this._dialogRef.close(false);
    }

    onYesClick(): void {
        this._dialogRef.close(true);
    }
}
