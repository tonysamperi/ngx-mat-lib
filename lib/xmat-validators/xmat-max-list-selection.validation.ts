import {ValidatorFn, FormArray} from "@angular/forms";

/**
 * An array selection must have
 * at least x items
 */
export function xmatMaxListSelection(max: number = 1): ValidatorFn {
    return (formArray: FormArray) => {
        const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected > max ? {max: true} : null;
    };

}

