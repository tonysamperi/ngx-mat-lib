/**
 * This is only for local test
 */
import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ViewEncapsulation} from "@angular/core";
import {Component} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


import {
    MAT_LABEL_GLOBAL_OPTIONS,
    MatButtonModule,
    MatCardModule,
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

import {XmatActionTextModule, XmatAccordionModule, XmatTimeInputModule, XmatTime} from "ngx-mat-lib";

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
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
        MatToolbarModule,
        XmatAccordionModule
    ]
})
export class CdkMaterialImportsModule {
}


@Component({
    selector: "mat-lib-test",
    templateUrl: "./test.html",
    styleUrls: [""],
    encapsulation: ViewEncapsulation.None
})
class AppComponent {

    title = "Test";
    icons = ["", "note_add", "delete_forever"];
    pippo = false;
    isUbiTimeInputRequired = true;
    isUbiTimeInputDisabled = false;
    account: any;
    textDisabled: boolean = false;
    textValue: string = "";
    testTimeModel = new XmatTime("12", "15");

    accordionOpened: boolean = true;
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        XmatTimeInputModule,
        CdkMaterialImportsModule
    ]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
