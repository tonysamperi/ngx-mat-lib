import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatSnackBarComponent} from "./ts/xmat-snack-bar.component";
export * from "./ts/xmat-snack-bar-data.model";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        XmatSnackBarComponent
    ],
    exports: [
        XmatSnackBarComponent
    ],
    entryComponents: [
        XmatSnackBarComponent
    ]
})
export class XmatSnackBarModule {
}
