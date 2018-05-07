import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatOverlayComponent} from "./ts/xmat-overlay.component";

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
