import {NgModule} from "@angular/core";
import {XxxDirective} from "./xxx.directive";

export * from "./xxx.directive";

@NgModule({
    imports: [],
    declarations: [
        XxxDirective
    ],
    exports: [
        XxxDirective
    ]
})
export class XxxModule {
}
