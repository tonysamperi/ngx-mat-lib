import {Component, ViewChild, OnInit} from "@angular/core";
import {
    XmatTime,
    XmatFunctionsService,
    XmatLegendItemContentComponent,
    XmatDialogContentComponent,
    XmatSnackBarData,
    XmatLegendItem,
    XmatSnackBarDataTypes,
    XmatFile,
    XmatRestService
} from "ngx-mat-lib";
import {HttpClient} from "@angular/common/http";
import {SafeResourceUrl} from "@angular/platform-browser";
import {DomSanitizer} from "@angular/platform-browser";

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

    accordionOpened: boolean = !0;
    accordionDisabled: boolean = !0;
    actionDisabled: boolean = !0;
    downloadResource: SafeResourceUrl;
    dpModel = new Date();
    figataSpaziale: string = "";
    files: XmatFile[] = [
        {fileName: "sample-pdf.pdf", url: "./assets/sample-pdf.pdf", desc: "Lorem ipsum dolor PDF"},
        {fileName: "sample-text.txt", url: "./assets/sample-text.txt", desc: "Lorem ipsum dolor TXT"}
    ];
    icons = ["", "note_add", "delete_forever"];
    minDate: Date = minDate;
    maxDate: Date = today;
    isUbiTimeInputDisabled = !1;
    isUbiTimeInputRequired = !0;
    selectedFile: File;
    testTimeModel = new XmatTime(12, 15);
    title = "Test";


    constructor(private _functions: XmatFunctionsService,
                private _http: HttpClient,
                private _rest: XmatRestService,
                private _sce: DomSanitizer) {

    }

    myTestList: XmatLegendItem[];

    alertPippo() {
        alert("PIPPO");
    }

    doDownload(file: XmatFile) {
        return this._rest.downloadBlobFromUrl(file);
    }

    loadBlob(file: XmatFile) {
        if (!file) {
            return false;
        }
        this.downloadResource = void 0;
        this._rest.getBlobFromUrl(file).subscribe((results: Blob) => {
            const unsafeLink = URL.createObjectURL(results);
            this.downloadResource = this._sce.bypassSecurityTrustResourceUrl(unsafeLink);
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
