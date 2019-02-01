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
