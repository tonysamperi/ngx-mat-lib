import {NgModule} from "@angular/core";
import {MatCommonModule} from "@angular/material/core";
import {A11yModule} from "@angular/cdk/a11y";
import {XmatBadgeDirective} from "./xmat-badge.directive";

export * from "./xmat-badge.directive";

@NgModule({
    imports: [
        A11yModule,
        MatCommonModule
    ],
    exports: [XmatBadgeDirective],
    declarations: [XmatBadgeDirective],
})
export class XmatBadgeModule {
}
