import {Component, Input, ViewEncapsulation} from "@angular/core";
import {XmatAlertTypes} from "../xmat-models/xmat-alert-types.model";

@Component({
    selector: "xmat-alert-box",
    templateUrl: "./xmat-alert-box.component.html",
    styleUrls: ["./xmat-alert-box.component.scss"],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[id]": "id"
    }
})


export class XmatAlertBoxComponent {

    static nextId: number = 0;

    @Input()
    set xmatAlertType(newValue: XmatAlertTypes) {
        this._xmatAlertType = newValue !== void 0 ? newValue : XmatAlertTypes.info;
        this.xmatAlertTypeKlass = `xmat-alert-box-${XmatAlertTypes[this.xmatAlertType]}`;
    }

    get xmatAlertType(): XmatAlertTypes {
        return this._xmatAlertType;
    }

    id: number = XmatAlertBoxComponent.nextId++;
    xmatAlertTypeKlass: string;

    private _xmatAlertType: XmatAlertTypes;

    constructor() {
    }

}
