import {Component, ComponentFactoryResolver, ComponentRef, Inject, OnInit, ViewContainerRef} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {XmatConfirmDialogData} from "../../xmat-models/xmat-confirm-dialog.model";
import {XmatDialogContentComponent} from "./xmat-dialog-content.component";

@Component({
    selector: "xmat-confirm-dialog",
    styleUrls: ["../scss/xmat-confirm-dialog.component.scss"],
    templateUrl: "../tpl/xmat-confirm-dialog.component.html"
})
export class XmatConfirmDialogComponent implements OnInit {

    protected _dialogContentClass = XmatDialogContentComponent;
    protected _dialogContentRef: ComponentRef<XmatDialogContentComponent>;

    constructor(protected _dialogRef: MatDialogRef<XmatConfirmDialogComponent>,
                private _resolver: ComponentFactoryResolver,
                private _viewContainerRef: ViewContainerRef,
                @Inject(MAT_DIALOG_DATA) public data: XmatConfirmDialogData) {

    }

    ngOnInit(): void {
        console.info("CONFIRM DIALOG INIT", this.data.dialogContent);
        if (typeof this.data.dialogContent === "string") {
            const tmpCompInstance = this._constructContent();
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was String Content", "#006699", this.data.dialogContent);
            tmpCompInstance.content = this.data.dialogContent;
            this.data.dialogContent = tmpCompInstance;
        }
        else if (this.data.dialogContent instanceof XmatDialogContentComponent) {
            // Valid
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was Instance Content", "#336699", this.data.dialogContent);
        }
        else {
            // this._xmatFunctions.logWithStyle("XmatDialog", "Was INVALID Content", "#CC0000", this.data.dialogContent);
            // Hide broken ones?
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
