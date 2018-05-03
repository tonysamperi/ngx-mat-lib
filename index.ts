/**
 * ngx-mat-lib
 * @author Tony Samperi
 * TODO: figure out why this error is shown now
 * >>> Property shouldPlaceholderFloat from interface MatFormFieldControl is not implemented <<<
 */
import {NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material";
import {
    XmatAccordionModule,
    XmatConstantsService,
    XmatDialogModule,
    XmatActionModule,
    XmatTimeInputModule,
    XmatGlobalSpinnerModule,
    XmatMatMiniChipListModule,
    XmatMenuModule,
    XmatOverlayModule,
    XmatPipesModule,
    XmatRestModule,
    XmatSnackBarModule,
    XmatSpinnerModule,
    XmatStatesModule,
    XmatFunctionsService,
    XmatRouteInterceptorService,
    XmatSharedDataService,
    MAT_DATE_CUSTOM_FORMATS,
    XmatMatDateLocale
} from "./src";

@NgModule({
    imports: [
        XmatOverlayModule
    ],
    exports: [
        XmatAccordionModule,
        XmatDialogModule,
        XmatActionModule,
        XmatTimeInputModule,
        XmatGlobalSpinnerModule,
        XmatMatMiniChipListModule,
        XmatMenuModule,
        XmatOverlayModule,
        XmatPipesModule,
        XmatRestModule,
        XmatSnackBarModule,
        XmatSpinnerModule,
        XmatStatesModule,
        XmatRestModule
    ],
    providers: [
        {provide: DateAdapter, useClass: XmatMatDateLocale},
        {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_CUSTOM_FORMATS},
        XmatFunctionsService,
        XmatConstantsService,
        XmatRouteInterceptorService,
        XmatSharedDataService,
    ],
})
export class XmatLibraryModule {
}

export * from "./src";