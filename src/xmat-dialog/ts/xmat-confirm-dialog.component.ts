import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: "xmat-confirm-dialog",
    styles: [
        "div[mat-dialog-actions] {justify-content: space-between; display: flex;}"
    ],
    template: `
        <h3 mat-dialog-title>{{data.title || "Conferma"}}</h3>
        <div mat-dialog-content [innerHTML]="data.dialogContent">

        </div>
        <div mat-dialog-actions>
            <button mat-button
                    *ngIf="!data.hideCancelButton"
                    mat-raised-button
                    cdkFocusInitial
                    (click)="onNoClick()">
                {{data.cancelText || "Annulla"}}
            </button>
            <button mat-button
                    mat-raised-button
                    color="warn"
                    (click)="onYesClick()">
                {{data.confirmText || "Conferma"}}
            </button>
        </div>
    `,
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
