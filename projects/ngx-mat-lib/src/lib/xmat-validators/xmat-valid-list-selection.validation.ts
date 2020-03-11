import { AbstractControl, ValidatorFn } from "@angular/forms";
import { indexOf } from "lodash";

/**
 * A selection must match (or must not)
 * one of a given list
 */
export function xmatValidListSelection(sourceOptions: any[], controlKey: string = void 0, reverse: boolean = false): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
        const value = controlKey ? control.value[controlKey] : control.value;
        if (!value) {
            return null;
        }
        const matchIndex = indexOf(sourceOptions, value);
        const isValid = reverse ? matchIndex < 0 : matchIndex > -1;

        return isValid ? null : { "invalidListSelection": { value: control.value } };
    };
}
