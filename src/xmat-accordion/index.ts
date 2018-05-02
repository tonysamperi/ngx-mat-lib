import {NgModule} from '@angular/core';
import {MatExpansionModule} from "@angular/material";
import {XmatAccordionComponent} from './ts/xmat-accordion.component';
@NgModule({
    imports: [
        MatExpansionModule
    ],
    declarations: [
        XmatAccordionComponent
    ],
    exports: [
        XmatAccordionComponent
    ]
})
export class XmatAccordionModule {
}