import {AbstractControl, ValidatorFn} from "@angular/forms";
import {indexOf} from "lodash";

/**
 * A selection must match
 * one of a given list
 */
export function xmatValidListSelection(sourceOptions: any[], controlKey): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value[controlKey];
        if (!value) {
            return null;
        }
        const matchIndex = indexOf(sourceOptions, value);
        return matchIndex > -1 ? null : {"invalidListSelection": {value: control.value}};
    };
}
