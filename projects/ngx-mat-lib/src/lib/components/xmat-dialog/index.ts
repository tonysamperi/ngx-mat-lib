import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule
} from "@angular/material";
import {XmatConfirmDialogComponent} from "./xmat-confirm-dialog.component";
import {XmatAlertDialogComponent} from "./xmat-alert-dialog.component";
import {XmatDialogContentComponent} from "./xmat-dialog-content.component";

export * from "./xmat-alert-dialog.component";
export * from "./xmat-confirm-dialog.component";
export * from "./xmat-dialog-content.component";

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
        XmatDialogContentComponent,
        MatDialogModule,
    ],
    entryComponents: [
        XmatConfirmDialogComponent,
        XmatAlertDialogComponent,
        XmatDialogContentComponent
    ]
})
export class XmatDialogModule {
}
