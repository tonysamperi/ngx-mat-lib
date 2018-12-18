import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule
} from "@angular/material";
import {XmatConfirmDialogComponent} from "./ts/xmat-confirm-dialog.component";
import {XmatAlertDialogComponent} from "./ts/xmat-alert-dialog.component";
import {XmatDialogContentComponent} from "./ts/xmat-dialog-content.component";

export * from "./ts/xmat-alert-dialog.component";
export * from "./ts/xmat-confirm-dialog.component";
export * from "./ts/xmat-dialog-content.component";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule
    ],
    declarations: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent,
        XmatDialogContentComponent
    ],
    exports: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent,
        XmatDialogContentComponent
    ],
    entryComponents: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent,
        XmatDialogContentComponent
    ]
})
export class XmatDialogModule {
}
