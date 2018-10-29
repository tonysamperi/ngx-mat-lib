import {XmatDialogContentComponent} from "../xmat-dialog/ts/xmat-dialog-content.component";
import {ThemePalette} from "@angular/material";

export interface XmatConfirmDialogData {
    cancelText?: string;
    confirmText?: string;
    dialogContent: string | XmatDialogContentComponent;
    hideCancelButton?: boolean;
    confirmColor?: ThemePalette;
    title: string;
}
