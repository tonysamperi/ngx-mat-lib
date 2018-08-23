import {AbstractControl, ValidatorFn} from "@angular/forms";
import * as _ from "lodash";

/**
 * This Function can be assigned to FormGroup validation
 * in order to verify that a given set of values
 * are equal
 */
export function xmatValuesMatchValidation(controlKeys: string[]): ValidatorFn {
    const errorKey = "valuesMatchValidation";
    let error = null;
    let match = false;
    if (!controlKeys.length) {
        console.warn("Invalid args supplied for valuesMatchValidation. Rule will not apply.");
        return error;
    }
    if (controlKeys.length === 1) {
        console.error("1 arg supplied for valuesMatchValidation. Rule will never comply.", controlKeys);
        return (control: AbstractControl): { [key: string]: any } => {
            return {
                [errorKey]: true
            };
        };
    }

    return (control: AbstractControl): { [key: string]: any } => {
        match = false;
        error = null;

        _.each(controlKeys, (key, index) => {
            if (index > 0) {
                // Breaks at first false value
                return match = control.value[key] === control.value[controlKeys[index - 1]];
            }
        });

        if (!match) {
            error = {[errorKey]: true};
            _.each(controlKeys, key => {
                const singleCtrl = control.get(key);
                const toSet = _.merge(singleCtrl.errors, error);
                singleCtrl.setErrors(toSet);
            });
        }
        else {
            _.each(controlKeys, key => {
                const singleCtrl = control.get(key);
                if (!!singleCtrl.errors && "valuesMatchValidation" in singleCtrl.errors) {
                    delete singleCtrl.errors["valuesMatchValidation"];
                    if (!Object.keys(singleCtrl.errors).length) {
                        singleCtrl.setErrors(null);
                    }
                }
            });


        }
        return error;
    };
}
