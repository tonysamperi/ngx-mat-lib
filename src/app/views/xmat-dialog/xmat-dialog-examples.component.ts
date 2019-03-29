import {Component, ViewChild} from "@angular/core";
import {XmatFunctionsService, XmatDialogContentComponent} from "ngx-mat-lib";

@Component({
    selector: "xmat-dialog-examples",
    templateUrl: "./xmat-dialog-examples.component.html"
})

export class XmatDialogExamplesComponent {

    @ViewChild("myDialogContent") myDialogContent: XmatDialogContentComponent;

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

}
