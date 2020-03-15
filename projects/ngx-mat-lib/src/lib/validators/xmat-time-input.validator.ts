import { AbstractControl, ValidatorFn } from "@angular/forms";
import { XmatGenericObject, XmatTime } from "../models/index";

export function xmatTimeInputValidation(control: AbstractControl): XmatGenericObject {
    const errorKey = "xmatTimeInputValidation";
    let error = null;
    const count = control.value.hours + control.value.minutes;
    if (count.length > 0 && count.length < 4) {
        error = { [errorKey]: true };
    }

    return error;
}

export function xmatMinTimeValidation(minTime: XmatTime): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value as XmatTime;
        if (!value) {
            return null;
        }
        const hasError = value.hours < minTime.hours || (value.hours === minTime.hours && value.minutes < minTime.minutes);
        return hasError ? { "xmatTooEarly": { value: control.value } } : null;
    };
}

export function xmatMaxTimeValidation(maxTime: XmatTime): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value as XmatTime;
        if (!value) {
            return null;
        }
        const hasError = value.hours > maxTime.hours || (value.hours === maxTime.hours && value.minutes > maxTime.minutes);
        return hasError ? { "xmatTooLate": { value: control.value } } : null;
    };
}
