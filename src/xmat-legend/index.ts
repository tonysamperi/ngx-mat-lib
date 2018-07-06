import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatLegendItemContentComponent} from "./ts/xmat-legend-item-content.component";
import {XmatLegendComponent} from "./ts/xmat-legend.component";

export * from "./ts/xmat-legend.model";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        XmatLegendComponent,
        XmatLegendItemContentComponent
    ],
    exports: [
        XmatLegendComponent,
        XmatLegendItemContentComponent
    ],
    entryComponents: [
        XmatLegendItemContentComponent
    ]
})
export class XmatLegendModule {
}
