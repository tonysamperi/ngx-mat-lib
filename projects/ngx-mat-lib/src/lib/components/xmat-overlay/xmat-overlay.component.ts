import { Component, ElementRef, AfterViewInit, Input, OnDestroy, OnInit, HostBinding } from "@angular/core";
import { XmatOverlayStyles, XmatGenericObject } from "../../models";

const invalidDisplayValues = ["inline", "none"];

@Component({
    selector: "xmat-overlay",
    template: `
        <ng-content></ng-content>`,
    styleUrls: ["./xmat-overlay.component.scss"],
    host: {
        "[class.xmat-overlay]": "true",
        "[class.xmat-overlay-light]": "isLight",
        "[class.xmat-overlay-dark]": "isDark",
        "[style.zIndex]": "zIndex"
    }
})
export class XmatOverlayComponent implements AfterViewInit, OnDestroy, OnInit {

    static nextId: number = 0;

    @HostBinding("id") id: string = `xmat_overlay_${++XmatOverlayComponent.nextId}`;

    @Input("zIndex")
    set zIndex(newValue: number) {
        this._zIndex = newValue === void 0 ? 1 : newValue;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    isLight: boolean = !1;
    isDark: boolean = !1;

    // tslint:disable-next-line:no-input-rename
    @Input("overlayStyle") private _overlayStyle: XmatOverlayStyles;

    private _parentStyleBak: XmatGenericObject = {};
    private _zIndex: number;

    constructor(private _elRef: ElementRef) {
    }

    ngOnInit(): void {
        this.isLight = this._overlayStyle === XmatOverlayStyles.LIGHT;
        this.isDark = this._overlayStyle === XmatOverlayStyles.DARK;
    }

    ngAfterViewInit(): void {

        const $xmatOverlay = this._elRef.nativeElement;
        const xmatOverlayParentComStyle = window.getComputedStyle($xmatOverlay.parentNode);
        const xmatOverlayParentDisplay = xmatOverlayParentComStyle.getPropertyValue("display");
        if (invalidDisplayValues.indexOf(xmatOverlayParentDisplay) !== -1) {
            console.warn(`xmat-overlay cannot apply to ${invalidDisplayValues.join(" or ")} elements`);
            $xmatOverlay.parentNode.style.display = "block";
        }
        this._parentStyleBak.display = xmatOverlayParentDisplay;
        this._parentStyleBak.position = xmatOverlayParentComStyle.getPropertyValue("position");
        $xmatOverlay.parentNode.style.position = "relative";

    }

    ngOnDestroy(): void {
        const $xmatOverlay = this._elRef.nativeElement;
        const $overlayContainer = $xmatOverlay.parentNode;
        if (!!$overlayContainer && !!$overlayContainer.style) {
            $overlayContainer.style.display = this._parentStyleBak.display;
            $overlayContainer.style.position = this._parentStyleBak.position;
        }
    }

}
