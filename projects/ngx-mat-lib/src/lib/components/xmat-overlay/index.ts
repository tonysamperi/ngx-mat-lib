import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatOverlayComponent} from "./xmat-overlay.component";

export * from "./xmat-overlay.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        XmatOverlayComponent
    ],
    exports: [
        XmatOverlayComponent
    ]
})
export class XmatOverlayModule {
}
