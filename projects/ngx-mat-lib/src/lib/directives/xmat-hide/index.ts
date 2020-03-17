import {NgModule} from "@angular/core";
import {XmatHideDirective} from "./xmat-hide.directive";

export * from "./xmat-hide.directive";

@NgModule({
    imports: [],
    declarations: [
        XmatHideDirective
    ],
    exports: [
        XmatHideDirective
    ]
})
export class XmatHideModule {
}
