import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from "@angular/core";
import {CanDisable, CanColor, ThemePalette, mixinColor} from "@angular/material";
import {Constructor} from "@angular/material/typings/core/common-behaviors/constructor";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

const DEFAULT_COLOR = "accent";
const transcludedHeaderSelector: string = ".xmat-accordion-title";
const headerSelector: string = "mat-expansion-panel-header";
// const transcludedContentSelector: string = ".xmat-accordion-content";

// Boilerplate for applying mixins to MatToolbar.
export class XmatAccordionBase {
    // tslint:disable-next-line:naming-convention
    constructor(public _elementRef: ElementRef) {
    }
}

// tslint:disable-next-line:naming-convention
export const _XmatAccordionMixinBase: Constructor<CanColor> & typeof XmatAccordionBase = mixinColor(XmatAccordionBase);

@Component({
    selector: "xmat-accordion",
    styleUrls: ["./xmat-accordion.component.scss"],
    host: {
        "[attr.disabled]": "disabled || null",
        "class": "xmat-accordion",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'"
    },
    templateUrl: "./xmat-accordion.component.html",
    encapsulation: ViewEncapsulation.None
})


export class XmatAccordionComponent extends _XmatAccordionMixinBase implements CanColor, CanDisable, AfterViewInit {

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
        const $header: HTMLElement = this._elementRef.nativeElement.querySelector(headerSelector);
        if (!!$header) {
            const $panel = $header.parentElement;
            if ($header.querySelectorAll(transcludedHeaderSelector).length === 0) {
                $panel.removeChild($header);
                $panel.classList.add("xmat-accordion-no-header");
            }
        }
    }
}
