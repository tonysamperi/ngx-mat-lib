import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

export interface XmatAlertDialogData {
    type: XmatAlertTypes;
    title?: string;
    cancelText?: string;
    confirmText?: string;
    hideConfirmButton?: boolean;
    hideCancelButton?: boolean;
    showCloseButton?: boolean;
}

export enum XmatAlertTypes {
    success,
    error,
    question,
    info,
    warning
}

export enum XmatAlertDialogActions {
    confirm,
    cancel,
    close
}

const dash: string = "-";
const typePlaceHolder: string = "%type%";
const classNamePre: string = "swal2";
const classNameAnimate: string = [classNamePre, "animate", typePlaceHolder, "icon"].join(dash);

@Component({
    selector: "xmat-message-dialog",
    template: `
        <div class="swal2-header swal2-show">
            <button type="button"
                    *ngIf="data.showCloseButton"
                    class="swal2-close"
                    (click)="onActionClick(md.actions.close)"
                    aria-label="Chiudi" style="display: flex;">×
            </button>
            <div class="swal2-icon" [ngClass]="md.classNames">
		<span class="swal2-icon-text">
        {{md.inner[md.type]}}
    </span>
                <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
                <span class="swal2-success-line-tip"></span>
                <span class="swal2-success-line-long"></span>
                <div class="swal2-success-ring"></div>
                <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
                <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
                <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span
                        class="swal2-x-mark-line-right"></span></span>
            </div>
        </div>
        <h3 *ngIf="!!data.title" mat-dialog-title>{{data.title}}</h3>

        <div mat-dialog-content [innerHTML]="data.dialogContent"></div>

        <div mat-dialog-actions *ngIf="!data.hideCancelButton && !data.hideConfirmButton">
            <button mat-button
                    mat-raised-button cdkFocusInitial
                    *ngIf="!data.hideCancelButton"
                    (click)="onActionClick(md.actions.cancel)">
                {{data.cancelText || "Annulla"}}
            </button>
            <button mat-button
                    mat-raised-button
                    *ngIf="!data.hideConfirmButton"
                    color="warn"
                    (click)="onActionClick(md.actions.confirm)">
                {{data.confirmText || "Conferma"}}
            </button>
        </div>
    `,
    styleUrls: ["../scss/xmat-alert-dialog.component.scss"]
})
export class XmatAlertDialogComponent implements OnInit {

    md: any = {
        actions: XmatAlertDialogActions,
        classNames: "",
        types: XmatAlertTypes,
        inner: {
            [XmatAlertTypes[XmatAlertTypes.success]]: "",
            [XmatAlertTypes[XmatAlertTypes.error]]: "",
            [XmatAlertTypes[XmatAlertTypes.warning]]: "!",
            [XmatAlertTypes[XmatAlertTypes.question]]: "?",
            [XmatAlertTypes[XmatAlertTypes.info]]: "i",
        },
        type: ""
    };

    /**
     * TODO: add dynamic template binding, that would be really cool and reusable
     */
    constructor(private _dialogRef: MatDialogRef<XmatAlertDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void {
        this.md.type = XmatAlertTypes[this.data.type || XmatAlertTypes.info];
        this.md.classNames = [
            [classNamePre, this.md.type].join(dash),
            classNameAnimate.replace(typePlaceHolder, this.md.type)
        ];
    }

    onActionClick(action): void {
        this._dialogRef.close(XmatAlertDialogActions[action]);
    }
}
