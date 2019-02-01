import {XmatDialogContentComponent} from "../xmat-dialog/xmat-dialog-content.component";
import {ThemePalette} from "@angular/material";

export interface XmatConfirmDialogData {
    cancelText?: string;
    confirmText?: string;
    dialogContent: string | XmatDialogContentComponent;
    dialogId?: string;
    hideCancelButton?: boolean;
    confirmColor?: ThemePalette;
    title: string;
}
