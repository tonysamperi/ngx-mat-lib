import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatSnackBarComponent} from "./ts/xmat-snack-bar.component";
import {MatSnackBarModule} from "@angular/material";

export * from "./ts/xmat-snack-bar.component";

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    declarations: [
        XmatSnackBarComponent
    ],
    exports: [
        XmatSnackBarComponent,
        MatSnackBarModule
    ],
    entryComponents: [
        XmatSnackBarComponent
    ]
})
export class XmatSnackBarModule {
}
