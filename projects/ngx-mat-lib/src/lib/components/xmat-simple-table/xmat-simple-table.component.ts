import {Component, Input} from "@angular/core";
// XMAT MODELS
import {XmatSimpleTable, XmatSimpleTableCol} from "../../models/xmat-simple-table.model";
//
import {map, orderBy} from "lodash";

@Component({
    selector: "xmat-simple-table",
    templateUrl: "./xmat-simple-table.component.html",
    styleUrls: ["./xmat-simple-table.component.scss"]
})
export class XmatSimpleTableComponent {

    @Input()
    set config(newValue: XmatSimpleTable) {
        this._config = void 0;
        if (newValue) {
            if (Array.isArray(newValue.cols)) {
                this._config = {
                    tdKlass: "",
                    thKlass: "",
                    ...newValue
                };
                this.displayedCols = map(orderBy(newValue.cols, c => c.order), (c => c.key)); // flattened array of keys
                this._config.cols = map(newValue.cols, (c: XmatSimpleTableCol) => ({
                    tdKlass: "",
                    thKlass: "",
                    ...c,
                    key: c.key,
                    label: c.label,
                }));

            }
        }
    }

    get config(): XmatSimpleTable {
        return this._config;
    }

    displayedCols: string[] = [];

    private _config: XmatSimpleTable;

    constructor() {

    }
}
