import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
//
import {XmatMediaQueryStateComponent} from "./xmat-media-query-state.component";

export * from "./xmat-media-query-state.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        XmatMediaQueryStateComponent
    ],
    exports: [
        XmatMediaQueryStateComponent
    ]
})
export class XmatMediaQueryStateModule {
}
