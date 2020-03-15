import {NgModule} from "@angular/core";
import {XxxComponent} from "./xxx.component";

export * from "./xxx.component";

@NgModule({
    imports: [],
    declarations: [
        XxxComponent
    ],
    exports: [
        XxxComponent
    ]
})
export class XxxModule {
}
