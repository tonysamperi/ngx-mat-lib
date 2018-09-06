/**
 * This is only for local test
 */
import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ViewEncapsulation, ViewChild, OnInit} from "@angular/core";
import {Component} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


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
    XmatActionTextModule,
    XmatAccordionModule,
    XmatTimeInputModule,
    XmatSnackBarModule,
    XmatLegendModule,
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

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 90);

@Component({
    selector: "mat-lib-test",
    templateUrl: "./test.html",
    styleUrls: [""],
    encapsulation: ViewEncapsulation.None
})
class AppComponent implements OnInit {

    title = "Test";
    icons = ["", "note_add", "delete_forever"];
    pippo = false;
    isUbiTimeInputRequired = true;
    isUbiTimeInputDisabled = false;
    account: any;
    textDisabled: boolean = false;
    textValue: string = "";
    testTimeModel = new XmatTime("12", "15");
    dpModel = new Date();

    minDate: Date = minDate;
    maxDate: Date = today;

    accordionOpened: boolean = true;

    constructor(private _functions: XmatFunctionsService) {

    }

    @ViewChild("myTest1") myTest1: any;
    @ViewChild("myTest2") myTest2: any;

    myTestList: XmatLegendItem[];


    alertPippo() {
        alert("PIPPO");
    }

    ngOnInit() {
        this.myTestList = [
            {
                className: "pippo1",
                content: "<h2>pluto was string</h2>",
                color: "blue"
            },
            {
                className: "pippo2",
                content: this.myTest1,
                color: "red"
            },
            {
                className: "pippo3",
                content: this.myTest2,
                color: "rgba(50,100,200)"
            },
            {
                className: "pippo4",
                content: "Someone else, something else",
                color: "#006699"
            }
        ];
    }


    showSnackBar(): void {

        const callback = () => {
            alert("CANCELLED");
        };
        const snackBarData: XmatSnackBarData = {
            type: XmatSnackBarDataTypes.success,
            message: "TEST MESSAGE",
            showAction: true,
            duration: 50000,
            actionText: "Annulla",
            actionCallback: callback
        };
        this._functions.showSnackBar(snackBarData);
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule,
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
    ]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
