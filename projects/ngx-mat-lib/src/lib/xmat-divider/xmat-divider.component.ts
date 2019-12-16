import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: "xmat-divider",
    host: {
        "role": "separator",
        "[attr.aria-orientation]": "vertical ? 'vertical' : 'horizontal'",
        "[class.xmat-divider-vertical]": "vertical",
        "[class.xmat-divider-horizontal]": "!vertical",
        "[class.xmat-divider-inset]": "inset",
        "class": "xmat-divider"
    },
    template: "",
    styleUrls: ["xmat-divider.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmatDividerComponent {

    static ngAcceptInputType_vertical: boolean | string | null | undefined;
    static ngAcceptInputType_inset: boolean | string | null | undefined;

    /** Whether the divider is vertically aligned. */
    @Input()
    get vertical(): boolean { return this._vertical; }
    set vertical(value: boolean) { this._vertical = coerceBooleanProperty(value); }
    private _vertical: boolean = false;

    /** Whether the divider is an inset divider. */
    @Input()
    get inset(): boolean { return this._inset; }
    set inset(value: boolean) { this._inset = coerceBooleanProperty(value); }
    private _inset: boolean = false;

}
