import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material";
import {XmatSpinnerComponent} from './ts/xmat-spinner.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        XmatSpinnerComponent
    ],
    exports: [
        XmatSpinnerComponent
    ]
})
export class XmatSpinnerModule {
}