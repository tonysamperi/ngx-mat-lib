import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {XmatMatTimeInputComponent} from "./xmat-time-input.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        XmatMatTimeInputComponent
    ],
    exports: [
        XmatMatTimeInputComponent
    ]
})
export class XmatTimeInputModule {
}
