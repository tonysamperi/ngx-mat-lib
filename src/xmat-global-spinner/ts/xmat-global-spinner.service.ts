import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {SpinnerState} from "./spinner-state.model";

@Injectable()
export class XmatGlobalSpinnerService {
    private _spinnerSubj = new Subject<SpinnerState>();

    spinnerState = this._spinnerSubj.asObservable();

    private _requests: number = 0;

    constructor() {
    }

    show() {
        this._requests++;
        this._spinnerSubj.next(<SpinnerState>{show: true});
    }

    hide() {
        this._requests > 0 && this._requests--;
        !this._requests && this._spinnerSubj.next(<SpinnerState>{show: false});
    }
}