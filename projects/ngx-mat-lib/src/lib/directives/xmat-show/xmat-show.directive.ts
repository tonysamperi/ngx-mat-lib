import {Directive, Input} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Directive({
    selector: "[xmatShow]",
    host: {
        "[class.xmat-d-none]": "!xmatShow"
    }
})
export class XmatShowDirective {

    @Input()
    set xmatShow(newValue: boolean) {
        this._xmatShow = coerceBooleanProperty(newValue);
    }

    get xmatShow(): boolean {
        return this._xmatShow;
    }

    private _xmatShow: boolean;
}
