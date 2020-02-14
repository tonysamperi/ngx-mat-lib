import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { XmatSummaryComponent } from "./xmat-summary.component";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    declarations: [
        XmatSummaryComponent
    ],
    exports: [
        XmatSummaryComponent
    ]
})
export class XmatSummaryModule { }
