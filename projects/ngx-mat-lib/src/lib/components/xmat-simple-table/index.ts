import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material";
//
import {XmatSimpleTableComponent} from "./xmat-simple-table.component";

export * from "./xmat-simple-table.component";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule
    ],
    declarations: [
        XmatSimpleTableComponent
    ],
    exports: [
        MatTableModule,
        XmatSimpleTableComponent
    ]
})
export class XmatSimpleTableModule {
}
