export interface XmatAlertDialogData {
    type: XmatAlertTypes;
    title?: string;
    cancelText?: string;
    confirmText?: string;
    hideConfirmButton?: boolean;
    hideCancelButton?: boolean;
    showCloseButton?: boolean;
    dialogContent?: string | HTMLElement;
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
