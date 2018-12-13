import {Component, ViewChild, OnInit} from "@angular/core";
import {
    XmatTime,
    XmatFunctionsService,
    XmatLegendItemContentComponent,
    XmatDialogContentComponent,
    XmatSnackBarData,
    XmatLegendItem,
    XmatSnackBarDataTypes
} from "ngx-mat-lib";
import {HttpClient} from "@angular/common/http";
import {XmatResponseTypes} from "ngx-mat-lib";
import {DomSanitizer} from "@angular/platform-browser";
import {SafeUrl} from "@angular/platform-browser";
import {SafeResourceUrl} from "@angular/platform-browser";

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 90);

@Component({
    selector: "xmat-app",
    templateUrl: "xmat-app.component.html",
    styleUrls: ["xmat-app.component.scss"],
})
export class XmatAppComponent implements OnInit {

    @ViewChild("myTest1") myTest1: XmatLegendItemContentComponent;
    @ViewChild("myTest2") myTest2: XmatLegendItemContentComponent;
    @ViewChild("myDialogContent") myDialogContent: XmatDialogContentComponent;

    downloadLink: SafeUrl;
    downloadResource: SafeResourceUrl;
    figataSpaziale: string = "";
    fileName: string = "pdf.pdf";
    title = "Test";
    icons = ["", "note_add", "delete_forever"];
    pippo = false;
    isUbiTimeInputRequired = !0;
    isUbiTimeInputDisabled = !1;
    account: any;
    textDisabled: boolean = !1;
    textValue: string = "";
    testTimeModel = new XmatTime(12, 15);
    dpModel = new Date();

    minDate: Date = minDate;
    maxDate: Date = today;

    accordionOpened: boolean = !0;
    accordionDisabled: boolean = !0;
    actionDisabled: boolean = !0;

    constructor(private _functions: XmatFunctionsService,
                private _http: HttpClient,
                private _sce: DomSanitizer) {

    }

    myTestList: XmatLegendItem[];

    alertPippo() {
        alert("PIPPO");
    }

    doDownload(filename: string) {
        this.downloadLink = void 0;
        this.downloadResource = void 0;
        this._http.get("assets/" + filename, {responseType: XmatResponseTypes.blob})
        .subscribe(results => {
            // IE DOESN'T SUPPORT VIEWING BLOB IN IFRAME SO WE START DOWNLOADING INSTEAD
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(results, filename);
            } else {
                console.info("DOWNLOAD SUCCESS", results);
                const unsafeLink = URL.createObjectURL(results);
                this.downloadLink = this._sce.bypassSecurityTrustUrl(unsafeLink);
                this.downloadResource = this._sce.bypassSecurityTrustResourceUrl(unsafeLink);
            }
        }, (error) => {
            console.warn("DOWNLOAD ERROR", error);
        });
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

    showDialog(): void {
        console.info("SHOW DIALOG CALLED", this.myDialogContent);
        this._functions.openConfirmDialog({
            cancelText: "UNDO",
            confirmText: "ALRIGHT!",
            dialogContent: this.myDialogContent,
            hideCancelButton: false,
            title: "MY AWESOME TITLE"
        });


    }

    showSnackBar($event: any): void {
        console.info("COMPONENT: ACTION CLICKED", $event);
        const callback = () => {
            alert("CANCELLED");
        };
        const snackBarData: XmatSnackBarData = {
            type: XmatSnackBarDataTypes.success,
            message: "TEST MESSAGE",
            showAction: true,
            duration: 1000,
            actionText: "Annulla",
            actionCallback: callback
        };
        this._functions.showSnackBar(snackBarData);
    }
}
