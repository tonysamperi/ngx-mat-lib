import {NgModule} from "@angular/core";
import {XmatActionTextDirective} from "./ts/xmat-action-text.directive";

@NgModule({
    declarations: [
        XmatActionTextDirective
    ],
    exports: [
        XmatActionTextDirective
    ]
})
export class XmatActionTextModule {
}
