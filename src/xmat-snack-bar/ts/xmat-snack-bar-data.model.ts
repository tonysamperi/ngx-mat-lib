export enum XmatSnackBarDataTypes {
    success = "xmat-snack-success",
    fail = "xmat-snack-fail"
}

export interface XmatSnackBarData {
    message?: string;
    showAction: boolean;
    actionText?: string;
    actionCallback?: Function;
    duration?: number;
    type?: XmatSnackBarDataTypes;
}
