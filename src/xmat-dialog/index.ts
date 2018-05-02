import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule} from "@angular/material";
import {XmatConfirmDialog} from './ts/xmat-confirm-dialog.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule
    ],
    declarations: [
        XmatConfirmDialog
    ],
    exports: [
        XmatConfirmDialog
    ],
    entryComponents: [
        XmatConfirmDialog
    ]
})
export class XmatDialogModule {
}