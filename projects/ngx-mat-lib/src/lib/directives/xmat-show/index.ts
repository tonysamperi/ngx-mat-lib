import {NgModule} from "@angular/core";
import {XmatShowDirective} from "./xmat-show.directive";

export * from "./xmat-show.directive";

@NgModule({
    imports: [],
    declarations: [
        XmatShowDirective
    ],
    exports: [
        XmatShowDirective
    ]
})
export class XmatShowModule {
}
