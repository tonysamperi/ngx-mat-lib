import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
//
import {
    XmatTime,
    XmatFunctionsService,
    XmatLegendItem,
    XmatLegendItemContentComponent,
    XmatSnackBarData,
    XmatSnackBarDataTypes,
} from "ngx-mat-lib";

const today = new Date();
const minDate = new Date();
minDate.setDate(minDate.getDate() - 90);

@Component({
    selector: "xmat-home",
    templateUrl: "./xmat-home.component.html",
    styleUrls: ["./xmat-home.component.scss"]
})

export class XmatHomeComponent implements OnInit {

    @ViewChild("myTest1") myTest1: XmatLegendItemContentComponent;
    @ViewChild("myTest2") myTest2: XmatLegendItemContentComponent;
    @ViewChild("myTest3") myTest3: XmatLegendItemContentComponent;

    dpModel = new Date();
    icons = ["", "note_add", "delete_forever"];
    minDate: Date = minDate;
    maxDate: Date = today;
    isUbiTimeInputDisabled = !1;
    isUbiTimeInputRequired = !0;
    myTestList: XmatLegendItem[];
    myTestListB: XmatLegendItem[];
    testFormGroup: FormGroup;
    testTimeModel: XmatTime = new XmatTime(12, 15);
    xmatTimeCtrl: FormControl;

    private _isTimeRequired: boolean = !1;

    constructor(private _functions: XmatFunctionsService,
                fb: FormBuilder) {
        this.testFormGroup = fb.group({
            "xmatTime": [""],
            "foo": ["bar", [Validators.required]]
        });

        this.xmatTimeCtrl = this.testFormGroup.get("xmatTime") as FormControl;
    }

    alert(text: string): void {
        alert(`Message: ${text}`);
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

        this.myTestListB = [
            {
                className: "incomplete",
                content: "<h2>Incomplete list</h2>",
                color: "violet"
            },
            {
                className: "incomplete",
                content: this.myTest3,
                color: "orange"
            },
            {
                className: "incomplete",
                content: "Some other content",
                color: "rgba(135,190,25)"
            }
        ];
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

    updateXmatTimeCtrlValidators(): void {
        this._isTimeRequired = !this._isTimeRequired;
        this.xmatTimeCtrl.setValidators(this._isTimeRequired ? [Validators.required] : []);
    }


}
