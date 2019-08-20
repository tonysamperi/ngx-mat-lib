import {Component, ViewChild} from "@angular/core";
import {XmatFunctionsService, XmatDialogContentComponent} from "ngx-mat-lib";
import {XmatAlertTypes} from "ngx-mat-lib";

@Component({
    selector: "xmat-dialog-examples",
    templateUrl: "./xmat-dialog-examples.component.html",
    styleUrls: ["xmat-dialog-examples.component.scss"]
})

export class XmatDialogExamplesComponent {

    @ViewChild("myDialogContent") myDialogContent: XmatDialogContentComponent;

    alertTypes: typeof XmatAlertTypes = XmatAlertTypes;
    title: string = "Dialog examples";
    twoWayText: string = "";

    constructor(private _functions: XmatFunctionsService) {

    }

    showDialog(): void {
        console.info("SHOW DIALOG CALLED", this.myDialogContent);
        this._functions.openConfirmDialog({
            cancelText: "UNDO",
            confirmText: "ALRIGHT!",
            dialogContent: this.myDialogContent,
            hideCancelButton: false,
            title: "MY AWESOME TITLE"
        });
    }

    showAlert(type: XmatAlertTypes): void {
        this._functions.openAlertDialog({
            title: "Xmat Alert!",
            dialogContent: `This is an alert of type <strong>${XmatAlertTypes[type].toUpperCase()}</strong>`,
            type: type,
            hideCancelButton: !0,
            confirmText: "Close this!"
        });
    }

}
