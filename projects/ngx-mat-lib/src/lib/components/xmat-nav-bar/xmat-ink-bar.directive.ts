import {
    Directive,
    ElementRef,
    NgZone,
    Inject
} from "@angular/core";
import {
    _MAT_INK_BAR_POSITIONER,
    _MatInkBarPositioner
} from "@angular/material/tabs";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "xmat-ink-bar",
    host: {
        "class": "mat-ink-bar",
    },
})
export class XmatInkBarDirective {

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _ngZone: NgZone,
        @Inject(_MAT_INK_BAR_POSITIONER) private _inkBarPositioner: _MatInkBarPositioner) {
    }

    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param element
     */
    alignToElement(element: HTMLElement) {
        this.show();

        if (typeof requestAnimationFrame !== "undefined") {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => this._setStyles(element));
            });
        }
        else {
            this._setStyles(element);
        }
    }

    /** Shows the ink bar. */
    show(): void {
        this._elementRef.nativeElement.style.visibility = "visible";
    }

    /** Hides the ink bar. */
    hide(): void {
        this._elementRef.nativeElement.style.visibility = "hidden";
    }

    /**
     * Sets the proper styles to the ink bar element.
     * @param element
     */
    private _setStyles(element: HTMLElement) {
        const positions = this._inkBarPositioner(element);
        const inkBar: HTMLElement = this._elementRef.nativeElement;

        inkBar.style.left = positions.left;
        inkBar.style.width = positions.width;
    }

}
