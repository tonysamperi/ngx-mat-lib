import {AriaDescriber} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {
    Directive, ElementRef,
    Input,
    NgZone,
    OnDestroy,
    Renderer2
} from "@angular/core";
import {ThemePalette} from "@angular/material/core";
import {XmatElementRef} from "../../xmat-models/index";

export type XmatBadgePosition = "above after" | "above before" | "below before" | "below after";
export type XmatBadgeSize = "small" | "medium" | "large";

/** Directive to display a text badge. */
@Directive({
    selector: "[xmatBadge]",
    host: {
        "class": "xmat-badge",
        "[class.xmat-badge-overlap]": "overlap",
        "[class.xmat-badge-above]": "isAbove()",
        "[class.xmat-badge-below]": "!isAbove()",
        "[class.xmat-badge-before]": "!isAfter()",
        "[class.xmat-badge-after]": "isAfter()",
        "[class.xmat-badge-small]": "size === 'small'",
        "[class.xmat-badge-medium]": "size === 'medium'",
        "[class.xmat-badge-large]": "size === 'large'",
        "[class.xmat-badge-hidden]": "hidden || !hasContent",
    },
})
export class XmatBadgeDirective implements OnDestroy {

    static nextId: number = 0;

    /*
     * Size of the badge. Can be "small", "medium", or "large".
     */
    // tslint:disable-next-line:no-input-rename
    @Input("xmatBadgeSize") size: XmatBadgeSize = "medium";

    /*
     * Position the badge should reside.
     * Accepts any combination of "above"|"below" and "before"|"after"
     */
    // tslint:disable-next-line:no-input-rename
    @Input("xmatBadgePosition") position: XmatBadgePosition = "below after";

    /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
    @Input("xmatBadgeColor")
    set color(value: ThemePalette) {
        this._setColor(value);
        this._color = value;
    }

    get color(): ThemePalette {
        return this._color;
    }

    /** Whether the badge should overlap its contents or not */
    @Input("xmatBadgeOverlap")
    get overlap(): boolean {
        return this._overlap;
    }

    set overlap(val: boolean) {
        this._overlap = coerceBooleanProperty(val);
    }

    /** The content for the badge */
    @Input("xmatBadge")
    set content(value: string) {
        this._content = value;
        this.hasContent = value != null && `${value}`.trim().length > 0;
        this._updateTextContent();
    }

    get content(): string {
        return this._content;
    }

    /** Message used to describe the decorated element via aria-describedby */
    @Input("xmatBadgeDescription")
    set description(newDescription: string) {
        if (newDescription !== this._description) {
            this._updateHostAriaDescription(newDescription, this._description);
            this._description = newDescription;
        }
    }

    get description(): string {
        return this._description;
    }

    /** Whether the badge is hidden. */
    @Input("xmatBadgeHidden")
    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(val: boolean) {
        this._hidden = coerceBooleanProperty(val);
    }

    /** Whether the badge has any content. */
    hasContent = false;
    /** Unique id for the badge */
    id: number = XmatBadgeDirective.nextId++;

    private _badgeElement: HTMLElement;
    private _color: ThemePalette = "primary";
    private _content: string;
    private _description: string;
    private _elementRef: XmatElementRef<HTMLElement>;
    private _hidden: boolean;
    private _overlap: boolean = true;


    constructor(private _ngZone: NgZone,
                private _ariaDescriber: AriaDescriber,
                private _renderer: Renderer2,
                elementRef: ElementRef) {

        // Bridge to the new Angular6 typed ElementRef
        this._elementRef = new XmatElementRef<HTMLElement>(elementRef.nativeElement);
    }

    /** Whether the badge is above the host or not */
    isAbove(): boolean {
        return this.position.indexOf("below") === -1;
    }

    /** Whether the badge is after the host or not */
    isAfter(): boolean {
        return this.position.indexOf("before") === -1;
    }

    ngOnDestroy() {
        if (this.description && this._badgeElement) {
            this._ariaDescriber.removeDescription(this._badgeElement, this.description);
        }
    }

    /** Injects a span element into the DOM with the content. */
    private _updateTextContent(): HTMLSpanElement {
        if (!this._badgeElement) {
            this._badgeElement = this._createBadgeElement();
        } else {
            this._badgeElement.textContent = this.content;
        }
        return this._badgeElement;
    }

    /** Creates the badge element */
    private _createBadgeElement(): HTMLElement {
        const rootNode = this._renderer;
        const badgeElement = document.createElement("span");
        const activeClass = "xmat-badge-active";

        badgeElement.setAttribute("id", `xmat-badge-content-${this.id}`);
        badgeElement.classList.add("xmat-badge-content");
        badgeElement.textContent = this.content;

        if (this.description) {
            badgeElement.setAttribute("aria-label", this.description);
        }

        this._elementRef.nativeElement.appendChild(badgeElement);

        // animate in after insertion
        if (typeof requestAnimationFrame === "function") {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    badgeElement.classList.add(activeClass);
                });
            });
        } else {
            badgeElement.classList.add(activeClass);
        }

        return badgeElement;
    }

    /** Adds css theme class given the color to the component host */
    private _setColor(colorPalette: ThemePalette) {
        if (colorPalette !== this._color) {
            if (this._color) {
                this._elementRef.nativeElement.classList.remove(`xmat-badge-${this._color}`);
            }
            if (colorPalette) {
                this._elementRef.nativeElement.classList.add(`xmat-badge-${colorPalette}`);
            }
        }
    }

    /** Sets the aria-label property on the element */
    private _updateHostAriaDescription(newDescription: string, oldDescription: string): void {
        // ensure content available before setting label
        const content = this._updateTextContent();

        if (oldDescription) {
            this._ariaDescriber.removeDescription(content, oldDescription);
        }

        if (newDescription) {
            this._ariaDescriber.describe(content, newDescription);
        }
    }

}
