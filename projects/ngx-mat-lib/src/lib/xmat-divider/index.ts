import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XmatDividerComponent } from "./xmat-divider.component";

export * from "./xmat-divider.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        XmatDividerComponent
    ],
    exports: [
        XmatDividerComponent,
    ]
})
export class XmatDividerModule {
}
