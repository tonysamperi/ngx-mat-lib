import {StatesClassNames, XmatStates} from "./xmat-states.model";
import * as _ from "lodash";

export class XmatStatesClassNamesService {

    private _map: StatesClassNames = {};

    constructor(prefix: string) {
        _.each(XmatStates, (state, key) => {
            // Continue if key is not a number
            if (typeof XmatStates[state] !== typeof 0) {
                return true;
            }
            this._map[state] = prefix + state;
        });
    }

    get() {
        return this._map;
    }
}
