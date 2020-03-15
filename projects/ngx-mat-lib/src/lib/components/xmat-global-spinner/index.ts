import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material";
import {XmatGlobalSpinnerComponent} from "./xmat-global-spinner.component";
import {XmatGlobalSpinnerService} from "./xmat-global-spinner.service";

export {XmatGlobalSpinnerService} from "./xmat-global-spinner.service";

@NgModule({
    declarations: [
        XmatGlobalSpinnerComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatProgressSpinnerModule
    ],
    exports: [
        XmatGlobalSpinnerComponent
    ],
    providers: [
        XmatGlobalSpinnerService
    ]
})
export class XmatGlobalSpinnerModule {
}
