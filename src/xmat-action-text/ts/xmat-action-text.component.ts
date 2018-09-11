import {
    Component, ElementRef, Input, ViewEncapsulation
} from "@angular/core";
import {CanDisable, CanColor, ThemePalette, mixinColor} from "@angular/material";
import {Constructor} from "@angular/material/typings/core/common-behaviors/constructor";

const DEFAULT_COLOR = "primary";


// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
export class XmatActionTextBase {
    constructor(public _elementRef: ElementRef) {
    }
}
export const _XmatActionMixinBase: Constructor<CanColor> & typeof XmatActionTextBase = mixinColor(XmatActionTextBase);

@Component({
    // tslint:disable-next-line:component-selector
    selector: "[xmatActionText]",
    styleUrls: ["../scss/xmat-action-text.component.scss"],
    host: {
        "class": "xmat-action",
        "[class.disabled]": "disabled || null",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'"
    },
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class XmatActionTextComponent extends _XmatActionMixinBase implements CanColor, CanDisable {

    @Input() color: ThemePalette = DEFAULT_COLOR;

    @Input() disabled: boolean;

    constructor(public _elementRef: ElementRef) {
        super(_elementRef);
    }

}
