import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatLegendItemContentComponent} from "./xmat-legend-item-content.component";
import {XmatLegendComponent} from "./xmat-legend.component";

export * from "./xmat-legend.model";
export * from "./xmat-legend-item-content.component";
export * from "./xmat-legend.component";

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
