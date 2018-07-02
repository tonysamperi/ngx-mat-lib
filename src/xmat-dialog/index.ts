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

export * from "./ts/xmat-confirm-dialog.component";
export * from "./ts/xmat-alert-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
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
