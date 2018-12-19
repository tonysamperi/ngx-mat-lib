import {NgModule, ModuleWithProviders} from "@angular/core";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatFunctionsService} from "./xmat-functions.service";
import {XmatSnackBarModule} from "../xmat-snack-bar/index";
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
        XmatDialogModule,
        XmatSnackBarModule
    ],
    exports: [
        XmatDialogModule,
        XmatSnackBarModule
    ]
})
export class XmatFunctionsModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: XmatFunctionsModule,
            providers: [
                XmatConstantsService,
                XmatFunctionsService
            ]
        };
    }
}

