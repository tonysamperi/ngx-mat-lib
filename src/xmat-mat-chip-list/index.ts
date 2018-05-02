import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from "@angular/material";
import {XmatMatMiniChipListComponent} from "./ts/xmat-mini-chip-list.component";
@NgModule({
    imports: [
        CommonModule,
        MatChipsModule
    ],
    declarations: [
        XmatMatMiniChipListComponent
    ],
    exports: [
        XmatMatMiniChipListComponent
    ]
})
export class XmatMatMiniChipListModule {
}