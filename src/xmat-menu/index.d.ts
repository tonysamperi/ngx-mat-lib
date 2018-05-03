import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material";
import {XmatMenuComponent} from './ts/menu.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
    ],
    declarations: [
        XmatMenuComponent
    ],
    exports: [
        XmatMenuComponent
    ]
})
export class XmatMenuModule {
}