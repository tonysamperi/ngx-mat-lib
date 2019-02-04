import {NgModule} from "@angular/core";
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

import {
    XMAT_DATE_FORMATS,
    XMAT_LOCALE_IT,
    XmatMatDateLocale,
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
import {XmatTestMocksListService} from "./services/xmat-test-mocks-list.service";
import {XmatTestMockService} from "./services/xmat-test-mock.service";
import {XmatTestRestService} from "./services/xmat-test-rest.service";
import {XmatTestComponent} from "./views/xmat-test/xmat-test.component";

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        // MatDatepickerModule,
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
    ],
    providers: [
        // SERVS
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
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        XmatImportsModule,
        XmatCdkMatImportsModule
    ],
    providers: [
        // {provide: DateAdapter, useClass: XmatMatDateLocale},
        // {provide: MAT_DATE_FORMATS, useValue: XMAT_DATE_FORMATS},
        // {provide: MAT_DATE_LOCALE, useValue: XMAT_LOCALE_IT},
        {provide: HTTP_INTERCEPTORS, useClass: XmatTestMockService, multi: true}
    ],
    entryComponents: [XmatAppComponent],
    declarations: [
        XmatAppComponent,
        XmatTestComponent
    ],
    bootstrap: [XmatAppComponent]
})
export class XmatLibTestModule {
}
