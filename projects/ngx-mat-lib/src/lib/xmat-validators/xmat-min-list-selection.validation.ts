import { ValidatorFn, FormArray } from "@angular/forms";

/**
 * An array selection must have
 * at least x items
 */
export function xmatMinListSelection(min: number = 1): ValidatorFn {
    return (formArray: FormArray) => {
        const totalSelected = formArray.controls
            .map(control => +!!control.value)
            .reduce((prev, next) => prev + next, 0);
        return totalSelected < min ? { xmatMinListSelection: true } : null;
    };

}
