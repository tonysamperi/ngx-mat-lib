import {ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {CanColor} from "@angular/material/core";
import {CanDisable, mixinColor, ThemePalette} from "@angular/material";

const DEFAULT_COLOR = "primary";


// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
export class XmatActionBase {
    constructor(public _elementRef: ElementRef) {
    }
}
export const _XmatActionMixinBase = mixinColor(XmatActionBase);

@Component({
    selector: '[xmatAction]',
    inputs: ["color"],
    host: {
        "[attr.disabled]": "disabled || null",
        "class": "xmat-action",
        "[class.mat-primary]": 'color == "primary"',
        "[class.mat-accent]": 'color == "accent"',
        "[class.mat-warn]": 'color == "warn"'
    },
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class XmatActionComponent extends _XmatActionMixinBase implements CanColor, CanDisable {

    color: ThemePalette;
    disabled: boolean;

    constructor(elementRef: ElementRef,) {

        super(elementRef);

        this.color = DEFAULT_COLOR;
    }
}