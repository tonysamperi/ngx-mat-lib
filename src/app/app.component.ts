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

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 90);

@Component({
    selector: "app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {

    figataSpaziale: string = "";
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
    accordionDisabled: boolean = true;
    actionDisabled: boolean = true;

    constructor(private _functions: XmatFunctionsService) {

    }

    @ViewChild("myTest1") myTest1: XmatLegendItemContentComponent;
    @ViewChild("myTest2") myTest2: XmatLegendItemContentComponent;
    @ViewChild("myDialogContent") myDialogContent: XmatDialogContentComponent;

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
