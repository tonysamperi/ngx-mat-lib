import {NgModule} from "@angular/core";
import {MatFormFieldRequiredDirective} from "./mat-form-field-required.directive";

export * from "./mat-form-field-required.directive";

@NgModule({
    imports: [],
    exports: [MatFormFieldRequiredDirective],
    declarations: [MatFormFieldRequiredDirective]
})
export class MatFormFieldRequiredModule {
}
