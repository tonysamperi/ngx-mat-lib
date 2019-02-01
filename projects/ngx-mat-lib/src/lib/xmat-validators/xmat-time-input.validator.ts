import {AbstractControl} from "@angular/forms";
import {XmatGenericObject} from "../xmat-models/index";

export function xmatTimeInputValidation(control: AbstractControl): XmatGenericObject {
    const errorKey = "xmatTimeInputValidation";
    let error = null;
    const count = control.value.hours + control.value.minutes;
    if (count.length > 0 && count.length < 4) {
        error = {[errorKey]: true};
    }

    return error;
}
