import {XmatDialogContentComponent} from "../xmat-dialog/ts/xmat-dialog-content.component";

export interface XmatConfirmDialogData {
    cancelText: string;
    confirmText: string;
    dialogContent: string | XmatDialogContentComponent;
    hideCancelButton: boolean;
    title: string;
}
