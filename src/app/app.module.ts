import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";

import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
} from "@angular/material";

import {
    XMAT_DATE_FORMATS,
    XMAT_LOCALE_IT,
    XmatTime,
    XmatSnackBarDataTypes,
    XmatMatDateLocale,
    XmatSnackBarData,
    XmatLegendItem,
    // COMPS
    XmatDialogModule,
    XmatDialogContentComponent,
    XmatActionTextModule,
    XmatAccordionModule,
    XmatTimeInputModule,
    XmatSnackBarModule,
    XmatLegendModule,
    XmatLegendItemContentComponent,
    // SERVS
    XmatConstantsService,
    XmatFunctionsService,
    //

} from "ngx-mat-lib";

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTableModule,
        MatSidenavModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule
    ]
})
export class CdkMaterialImportsModule {
}

@NgModule({
    exports: [
        // COMPS
        XmatActionTextModule,
        XmatAccordionModule,
        XmatDialogModule,
        XmatLegendModule,
        XmatTimeInputModule,
        XmatSnackBarModule,
    ],
    providers: [
        // SERVS
        XmatConstantsService,
        XmatFunctionsService,
    ],
})
export class XmatImportsModule {
}


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        XmatImportsModule,
        CdkMaterialImportsModule
    ],
    providers: [
        {provide: DateAdapter, useClass: XmatMatDateLocale},
        {provide: MAT_DATE_FORMATS, useValue: XMAT_DATE_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: XMAT_LOCALE_IT}
    ],
    entryComponents: [AppComponent],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class XmatLibTestModule {
}
