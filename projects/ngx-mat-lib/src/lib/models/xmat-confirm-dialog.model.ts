import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { XmatDialogContentComponent } from "../components/xmat-dialog/xmat-dialog-content.component";
import { ThemePalette } from "@angular/material";

export interface XmatConfirmDialogData {
    additionalForm?: FormControl | FormGroup | NgForm;
    cancelText?: string;
    confirmText?: string;
    dialogContent: string | XmatDialogContentComponent;
    dialogId?: string;
    hideCancelButton?: boolean;
    hideActions?: boolean;
    confirmColor?: ThemePalette;
    title: string;
}
