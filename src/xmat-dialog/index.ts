import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule} from "@angular/material";
import {XmatConfirmDialogComponent} from "./ts/xmat-confirm-dialog.component";
import {XmatAlertDialogComponent} from "./ts/xmat-alert-dialog.component";

export {XmatConfirmDialogComponent} from "./ts/xmat-confirm-dialog.component";
export {
    XmatAlertDialogActions,
    XmatAlertDialogComponent,
    XmatAlertDialogData,
    XmatAlertTypes,
} from "./ts/xmat-alert-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule
    ],
    declarations: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent
    ],
    exports: [
        XmatConfirmDialogComponent
    ],
    entryComponents: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent
    ]
})
export class XmatDialogModule {
}
