/**
 * This is only for local test
 */
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
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

import {XmatTimeInputModule, XmatTime} from "ngx-mat-lib";

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
        MatToolbarModule
    ]
})
export class CdkMaterialImportsModule {
}


@Component({
    selector: "mat-lib-test",
    template: `
        <h2>TIME INPUT</h2>
        <mat-form-field class="autoWidth">
            <xmat-time-input name="ubiTimeInputTest"
                             placeholder="hh:mm"
                             [(ngModel)]="testTimeModel"
                             [disabled]="isUbiTimeInputDisabled"
                             [required]="isUbiTimeInputRequired"></xmat-time-input>
        </mat-form-field>
    `,
    styleUrls: ["./index.scss"]
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
