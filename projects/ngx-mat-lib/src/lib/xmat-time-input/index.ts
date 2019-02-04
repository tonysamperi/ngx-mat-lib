import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {XmatMatTimeComponent} from "./xmat-time.component";

const XMAT_TIME_INPUT_DEPS = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
    declarations: [
        XmatMatTimeComponent
    ],
    imports: [
        XMAT_TIME_INPUT_DEPS
    ],
    exports: [
        XMAT_TIME_INPUT_DEPS,
        XmatMatTimeComponent
    ]
})
export class XmatTimeModule {
}
