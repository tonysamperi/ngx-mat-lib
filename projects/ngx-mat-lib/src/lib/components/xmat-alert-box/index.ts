import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatAlertBoxComponent} from "./xmat-alert-box.component";
import {MatCardModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        XmatAlertBoxComponent
    ],
    exports: [
        XmatAlertBoxComponent
    ]
})
export class XmatAlertBoxModule {
}
