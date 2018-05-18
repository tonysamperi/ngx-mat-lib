import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {CanColor} from "@angular/material/core";
import {CanDisable, mixinColor, ThemePalette} from "@angular/material";

const DEFAULT_COLOR = "primary";


// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
export class XmatActionTextBase {
    constructor(public _elementRef: ElementRef) {
    }
}
export const _XmatActionMixinBase = mixinColor(XmatActionTextBase);

@Component({
    selector: "[xmatActionText]",
    styleUrls: ["../scss/xmat-action-text.component.scss"],
    host: {
        "[attr.disabled]": "disabled || null",
        "class": "xmat-action",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'"
    },
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class XmatActionTextComponent extends _XmatActionMixinBase implements CanColor, CanDisable, OnInit {

    @Input() color: ThemePalette;
    disabled: boolean;

    constructor(elementRef: ElementRef) {

        super(elementRef);

        this.color = DEFAULT_COLOR;
    }

    ngOnInit() {
        console.info("XmatActionTextComponent COLOR", this.color);
    }
}