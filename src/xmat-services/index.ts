import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XmatFunctionsService} from "./xmat-functions.service";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatDialogModule} from "../xmat-dialog/index";

export * from "./xmat-date-locale.service";
export * from "./xmat-constants.service";
export * from "./xmat-functions.service";
export * from "./xmat-mock.service";
export * from "./xmat-mocks-list.service";
export * from "./xmat-rest.service";
export * from "./xmat-shared-data.service";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        XmatDialogModule
    ],
    providers: [
        XmatFunctionsService,
        XmatConstantsService
    ]
})
export class XmatServicesModule {
}
