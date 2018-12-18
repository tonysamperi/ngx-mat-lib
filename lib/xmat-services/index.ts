import {NgModule} from "@angular/core";
import {XmatSnackBarModule} from "../xmat-snack-bar";
import {XmatDialogModule} from "../xmat-dialog";
import {XmatFunctionsService} from "./xmat-functions.service";
import {ModuleWithProviders} from "@angular/core";

export * from "./xmat-date-locale.service";
export * from "./xmat-constants.service";
export * from "./xmat-functions.service";
export * from "./xmat-mock.service";
export * from "./xmat-mocks-list.service";
export * from "./xmat-rest.service";
export * from "./xmat-shared-data.service";

@NgModule({
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
                XmatFunctionsService
            ]
        };
    }
}

