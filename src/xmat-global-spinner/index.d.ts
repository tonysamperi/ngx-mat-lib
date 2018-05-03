import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material";
import {XmatGlobalSpinnerComponent} from "./ts/xmat-global-spinner.component";
import {XmatGlobalSpinnerService} from "./ts/xmat-global-spinner.service";

@NgModule({
    declarations: [
        XmatGlobalSpinnerComponent
    ],
    imports: [
        CommonModule,
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

export {XmatGlobalSpinnerService} from "./ts/xmat-global-spinner.service";