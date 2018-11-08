import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from "@angular/core";
import {CanDisable, CanColor, ThemePalette, mixinColor} from "@angular/material";
import {Constructor} from "@angular/material/typings/core/common-behaviors/constructor";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

const DEFAULT_COLOR = "accent";
const transcludedHeaderSelector: string = ".xmat-accordion-title";
// const transcludedContentSelector: string = ".xmat-accordion-content";

// Boilerplate for applying mixins to MatToolbar.
export class XmatAccordionBase {
    constructor(public _elementRef: ElementRef) {
    }
}

export const _XmatAccordionMixinBase: Constructor<CanColor> & typeof XmatAccordionBase = mixinColor(XmatAccordionBase);

@Component({
    selector: "xmat-accordion",
    styleUrls: ["../scss/xmat-accordion.component.scss"],
    host: {
        "[attr.disabled]": "disabled || null",
        "class": "xmat-accordion",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'"
    },
    templateUrl: "../tpl/xmat-accordion.component.html",
    encapsulation: ViewEncapsulation.None
})


export class XmatAccordionComponent extends _XmatAccordionMixinBase implements CanColor, CanDisable, AfterViewInit {

    @ViewChild("xmatAccordionHeader") private _xmatAccordionHeader: any; // TODO find out type

    @Input() color: ThemePalette;
    @Input() disabled: boolean;

    @Input()
    set expanded(value: boolean) {
        this._expanded = coerceBooleanProperty(value);
    }

    get expanded(): boolean {
        return this._expanded;
    }

    private _expanded: boolean = false;

    constructor(elementRef: ElementRef) {
        super(elementRef);

        this.color = DEFAULT_COLOR;
    }

    ngAfterViewInit() {
        if (!!this._xmatAccordionHeader) {
            const $header = this._xmatAccordionHeader._element.nativeElement;
            const $panel = $header.parentElement;
            if ($header.querySelectorAll(transcludedHeaderSelector).length === 0) {
                $panel.removeChild($header);
                $panel.classList.add("xmat-accordion-no-header");
            }
        }
    }
}
