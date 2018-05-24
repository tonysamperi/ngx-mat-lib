import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from "@angular/core";
import {CanColor} from "@angular/material/core";
import {CanDisable, mixinColor, ThemePalette} from "@angular/material";

const DEFAULT_COLOR = "accent";
const transcludedHeaderSelector: string = ".xmat-accordion-title";
// const transcludedContentSelector: string = ".xmat-accordion-content";


// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
export class XmatAccordionBase {
    constructor(public _elementRef: ElementRef) {
    }
}
export const _XmatAccordionMixinBase = mixinColor(XmatAccordionBase);

@Component({
    selector: "xmat-accordion",
    styleUrls: ["../scss/xmat-accordion.component.scss"],
    host: {
        "[attr.disabled]": "disabled || null",
        "class": "xmat-accordion",
        "[class.mat-primary]": "color == 'primary'",
        "[class.mat-accent]": "color == 'accent'",
        "[class.mat-warn]": "color == 'warn'",
        "(click)": "onContainerClick($event)"
    },
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="isExpanded">
                <mat-expansion-panel-header #xmatAccordionHeader>
                    <mat-panel-title>
                        <ng-content select=".xmat-accordion-title"></ng-content>
                    </mat-panel-title>
                    <mat-panel-description>
                        <ng-content select=".xmat-accordion-desc"></ng-content>
                    </mat-panel-description>
                </mat-expansion-panel-header>
                <ng-content select=".xmat-accordion-content"></ng-content>
            </mat-expansion-panel>
        </mat-accordion>
    `,
    encapsulation: ViewEncapsulation.None
})


export class XmatAccordionComponent extends _XmatAccordionMixinBase implements CanColor, CanDisable, AfterViewInit {

    @Input() color: ThemePalette;
    @Input() disabled: boolean;

    @Input("expanded") isExpanded: boolean;
    @ViewChild("xmatAccordionHeader") private _xmatAccordionHeader: any; // TODO find out type

    /**
     * ua = viewModel
     * this is meant to contain data used from the view
     */
    public ua = {};

    constructor(elementRef: ElementRef) {
        super(elementRef);

        this.color = DEFAULT_COLOR;
    }

    ngAfterViewInit() {
        let $header = this._xmatAccordionHeader._element.nativeElement;
        let $panel = $header.parentElement;
        if ($header.querySelectorAll(transcludedHeaderSelector).length === 0) {
            $panel.removeChild($header);
            $panel.classList.add("xmat-accordion-no-header");
        }
    }

    onContainerClick($event: any) {
        !this.disabled || $event.stopPropagation();
    }
}
