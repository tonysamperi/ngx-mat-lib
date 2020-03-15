import {Directive, ElementRef, Input} from "@angular/core";
import {CanDisable, CanColor, ThemePalette, mixinColor} from "@angular/material";
import {Constructor} from "@angular/material/typings/core/common-behaviors/constructor";

// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
export class XmatActionTextBase {
    constructor(public _elementRef: ElementRef) {
    }
}

// tslint:disable-next-line:naming-convention
export const _XmatActionMixinBase: Constructor<CanColor> & typeof XmatActionTextBase = mixinColor(XmatActionTextBase);

@Directive({
    selector: "[xmatActionText]",
    host: {
        "class": "xmat-action",
        "[class.disabled]": "disabled || null",
        "[class.xmat-cursor-pointer]": "!disabled",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'"
    }
})
export class XmatActionTextDirective extends _XmatActionMixinBase implements CanColor, CanDisable {

    @Input() color: ThemePalette = "primary";

    @Input() disabled: boolean;

    constructor(public _elementRef: ElementRef) {
        super(_elementRef);
    }

}
