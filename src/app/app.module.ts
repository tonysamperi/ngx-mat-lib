import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
} from "@angular/material";

import {NgxJsonViewModule} from "ng-json-view";
import {
    XMAT_DATE_FORMATS,
    XMAT_LOCALE_IT,
    XmatMatDateLocale,
    MatFormFieldRequiredModule,
    // COMPS MODULES
    XmatDialogModule,
    XmatActionTextModule,
    XmatAccordionModule,
    XmatTimeModule,
    XmatSnackBarModule,
    XmatLegendModule,
    // SERVS
    XmatConstantsService,
    XmatFunctionsService,
    XmatRestService
} from "ngx-mat-lib";

// TEST APP IMPORTS
import {XmatAppComponent} from "./xmat-app.component";

// COMPS
import {
    XmatMenuComponent
} from "./components/public";
// SRVS
import {
    XmatRoutesService,
    XmatTestInterceptorService,
    XmatTestMockService,
    XmatTestMocksListService,
    XmatTestRestService,
} from "./services/public";

// VIEWS
import {
    XmatAccordionExamplesComponent,
    XmatDialogExamplesComponent,
    XmatDownloadComponent,
    XmatHomeComponent,
    XmatRestExamplesComponent
} from "./views/public";
import {xmatRoutes} from "./models/xmat-routes";


const XMAT_DECLARATIONS = [
    // COMPS
    XmatMenuComponent,
    // VIEWS
    XmatAccordionExamplesComponent,
    XmatDialogExamplesComponent,
    XmatDownloadComponent,
    XmatHomeComponent,
    XmatRestExamplesComponent
];

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatTableModule,
        MatSidenavModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule
    ]
})
export class XmatCdkMatImportsModule {
}

@NgModule({
    exports: [
        // COMPS
        XmatActionTextModule,
        XmatAccordionModule,
        XmatDialogModule,
        XmatLegendModule,
        XmatTimeModule,
        XmatSnackBarModule,
        // MISC
        MatFormFieldRequiredModule
    ],
    providers: [
        // SERVS
        {provide: HTTP_INTERCEPTORS, useClass: XmatTestInterceptorService, multi: true},
        XmatConstantsService,
        XmatFunctionsService,
        XmatTestMocksListService,
        XmatTestRestService,
        XmatRestService
    ],
})
export class XmatImportsModule {
}


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(xmatRoutes, {
            useHash: true,
            enableTracing: false
        }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        // LIBS
        NgxJsonViewModule,
        XmatImportsModule,
        XmatCdkMatImportsModule,
    ],
    providers: [
        {provide: DateAdapter, useClass: XmatMatDateLocale},
        {provide: MAT_DATE_FORMATS, useValue: XMAT_DATE_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: XMAT_LOCALE_IT},
        {provide: HTTP_INTERCEPTORS, useClass: XmatTestMockService, multi: true},
        XmatRoutesService
    ],
    declarations: [
        XmatAppComponent,
        XMAT_DECLARATIONS
    ],
    entryComponents: [XmatAppComponent],
    bootstrap: [XmatAppComponent]
})
export class XmatLibTestModule {

    constructor(routesSrv: XmatRoutesService) {
        routesSrv.routes = xmatRoutes;
    }
}
