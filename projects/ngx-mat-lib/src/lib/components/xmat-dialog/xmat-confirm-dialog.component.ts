import { Component, ComponentFactoryResolver, ComponentRef, Inject, OnInit, ViewContainerRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { XmatConfirmDialogData } from "../../models/xmat-confirm-dialog.model";
import { XmatDialogContentComponent } from "./xmat-dialog-content.component";

@Component({
    selector: "xmat-confirm-dialog",
    styleUrls: ["./xmat-confirm-dialog.component.scss"],
    templateUrl: "./xmat-confirm-dialog.component.html"
})
export class XmatConfirmDialogComponent implements OnInit {

    public dialogContentOutlet: XmatDialogContentComponent;

    protected _dialogContentClass = XmatDialogContentComponent;
    protected _dialogContentRef: ComponentRef<XmatDialogContentComponent>;

    constructor(
        protected _dialogRef: MatDialogRef<XmatConfirmDialogComponent>,
        protected _resolver: ComponentFactoryResolver,
        protected _viewContainerRef: ViewContainerRef,
        @Inject(MAT_DIALOG_DATA) public data: XmatConfirmDialogData) {
    }

    ngOnInit(): void {
        if (!this.data.dialogContent) {
            this.data.dialogContent = "";
        }
        if (typeof this.data.dialogContent === "string") {
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was String Content", "#006699", this.data.dialogContent);
            const tmpCompInstance = this._constructContent();
            tmpCompInstance.content = this.data.dialogContent;
            this.dialogContentOutlet = tmpCompInstance;
        }
        else if (this.data.dialogContent instanceof XmatDialogContentComponent) {
            // Valid
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was Instance Content", "#336699", this.data.dialogContent);
            this.dialogContentOutlet = this.data.dialogContent;
        }
        else {
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was INVALID Content", "#CC0000", this.data.dialogContent);
            console.error(`xmat-confirm-dialog error: invalid content for dialogContent.
            Expected string|XmatDialogContentComponent, found '${typeof this.data.dialogContent}'`, this.data.dialogContent);
        }
    }

    onNoClick(): void {
        this._dialogRef.close(false);
    }

    onYesClick(): void {
        this._dialogRef.close(true);
    }

    // Private methods

    protected _constructContent(): XmatDialogContentComponent {
        const factory = this._resolver.resolveComponentFactory(this._dialogContentClass);
        this._dialogContentRef = this._viewContainerRef.createComponent(factory);
        return this._dialogContentRef.instance as XmatDialogContentComponent;
    }
}
