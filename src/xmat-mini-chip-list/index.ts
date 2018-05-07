import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatChipsModule} from "@angular/material";
import {XmatMiniChipListComponent} from "./ts/xmat-mini-chip-list.component";
@NgModule({
    imports: [
        CommonModule,
        MatChipsModule
    ],
    declarations: [
        XmatMiniChipListComponent
    ],
    exports: [
        XmatMiniChipListComponent
    ]
})
export class XmatMiniChipListModule {
}
