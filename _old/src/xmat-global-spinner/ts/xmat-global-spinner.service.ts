import {Injectable} from "@angular/core";
import {SpinnerState} from "./spinner-state.model";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class XmatGlobalSpinnerService {
    private _spinnerSubj = new Subject<SpinnerState>();

    spinnerState = this._spinnerSubj.asObservable();

    private _requests = 0;

    constructor() {
    }

    show() {
        this._requests++;
        this._spinnerSubj.next(<SpinnerState>{show: true});
    }

    hide() {
        if (this._requests > 0) {
            this._requests--;
        }
        if (this._requests < 1) {
            // Really necessary?
            this._requests = 0;
            this._spinnerSubj.next(<SpinnerState>{show: false});
        }
    }
}
