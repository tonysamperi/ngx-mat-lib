import {Directive, Input} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Directive({
    selector: "[xmatHide]",
    host: {
        "[class.xmat-d-none]": "xmatHide"
    }
})
export class XmatHideDirective {

    @Input()
    set xmatHide(newValue: boolean) {
        this._xmatHide = coerceBooleanProperty(newValue);
    }

    get xmatHide(): boolean {
        return this._xmatHide;
    }

    private _xmatHide: boolean;
}
