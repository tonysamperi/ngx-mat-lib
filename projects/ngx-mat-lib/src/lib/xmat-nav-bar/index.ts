import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatTabsModule, MatRippleModule} from "@angular/material";
//
import {XmatInkBarDirective} from "./xmat-ink-bar.directive";
import {XmatTabNavComponent, XmatTabLinkDirective} from "./xmat-nav-bar.component";

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MatRippleModule
    ],
    declarations: [
        XmatInkBarDirective,
        XmatTabLinkDirective,
        XmatTabNavComponent,
    ],
    exports: [
        XmatTabLinkDirective,
        XmatTabNavComponent,
    ]
})
export class XmatNavBarModule {
}
