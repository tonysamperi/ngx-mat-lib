import {FormGroup, ValidatorFn, ValidationErrors} from "@angular/forms";
import * as _ from "lodash";

/**
 * Accepts a validator and a quantity.
 * Applies the validator and checks if at least n fields of the formGroup are valid
 * @param validator
 * @param howMany
 */
export function xmatValidatorForAtLeast(validator: ValidatorFn, howMany: number = 1): ValidatorFn {

    const errorKey = "valuesFillAtLeastValidation";

    return (group: FormGroup): ValidationErrors => {
        if (group && group.controls) {
            const validCount = _.sumBy(Object.keys(group.controls), (key) => {
                const value = group.controls[key];
                const result = validator(value);
                return +!result;
            });
            return validCount >= howMany ? null : {[errorKey]: true};
        }

    }​
}