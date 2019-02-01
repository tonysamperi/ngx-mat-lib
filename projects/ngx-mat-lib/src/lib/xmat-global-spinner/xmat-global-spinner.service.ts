import {Injectable} from "@angular/core";
import {SpinnerState} from "../xmat-models/xmat-spinner-state.model";
import {Subject, Observable} from "rxjs";

@Injectable()
export class XmatGlobalSpinnerService {

    spinnerState: Observable<SpinnerState>;

    private _requests = 0;
    private _spinnerSubj: Subject<SpinnerState> = new Subject<SpinnerState>();

    constructor() {
        // Here to avoid "used before declaration error"
        this.spinnerState = this._spinnerSubj.asObservable();
    }

    show(): void {
        this._requests++;
        this._spinnerSubj.next(<SpinnerState>{show: true});
    }

    hide(): void {
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
