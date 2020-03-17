import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";

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
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from "@angular/material";

import {NgxJsonViewModule} from "ng-json-view";
import {
    XMAT_DATE_FORMATS,
    XMAT_LOCALE_IT,
    XmatMatDateLocale,
    // DIRECTIVES
    MatFormFieldRequiredModule,
    XmatHideModule,
    XmatShowModule,
    // COMPS MODULES
    XmatActionTextModule,
    XmatAccordionModule,
    XmatDialogModule,
    XmatDividerModule,
    XmatTimeModule,
    XmatLegendModule,
    XmatMediaQueryStateModule,
    XmatNavBarModule,
    XmatSimpleTableModule,
    XmatSnackBarModule,
    XmatSpinnerModule,
    XmatSummaryModule,
    // SERVS
    XmatConstantsService,
    XmatFunctionsService,
    XmatRestService
} from "ngx-mat-lib";

// TEST APP IMPORTS
import {XmatAppComponent} from "./xmat-app.component";
// COMPS
import {
    XmatMenuComponent,
} from "./components/public";
// DIRECTIVES
import {
    XmatHighlightDirective
} from "./directives/public";
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
    XmatRestExamplesComponent,
    XmatTableExamplesComponent,
    XmatUtilsComponent
} from "./views/public";
import {xmatRoutes} from "./models/xmat-routes.model";

const XMAT_DECLARATIONS = [
    // COMPS
    XmatMenuComponent,
    // VIEWS
    XmatAccordionExamplesComponent,
    XmatDialogExamplesComponent,
    XmatDownloadComponent,
    XmatHomeComponent,
    XmatRestExamplesComponent,
    XmatTableExamplesComponent,
    XmatUtilsComponent,
    // DIRECTIVES
    XmatHighlightDirective,
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
        MatSelectModule,
        MatTableModule,
        MatSidenavModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
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
        XmatDividerModule,
        XmatLegendModule,
        XmatMediaQueryStateModule,
        XmatNavBarModule,
        XmatTimeModule,
        XmatSimpleTableModule,
        XmatSnackBarModule,
        XmatSpinnerModule,
        XmatSummaryModule,
        // DIRECTIVES
        MatFormFieldRequiredModule,
        XmatHideModule,
        XmatShowModule,
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
        FlexLayoutModule,
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
