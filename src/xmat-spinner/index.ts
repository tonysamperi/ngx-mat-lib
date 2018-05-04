import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material";
import {XmatSpinnerComponent} from "./ts/xmat-spinner.component";

@NgModule({
    imports: [
        BrowserModule,
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
