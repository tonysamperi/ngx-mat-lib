import {XmatAlertTypes} from "./xmat-alert-types.model";

export interface XmatAlertDialogData {
    cancelText?: string;
    confirmText?: string;
    dialogContent?: string | HTMLElement;
    dialogId?: string;
    hideCancelButton?: boolean;
    hideConfirmButton?: boolean;
    showCloseButton?: boolean;
    title?: string;
    type: XmatAlertTypes;
}

export enum XmatAlertDialogActions {
    confirm,
    cancel,
    close
}
