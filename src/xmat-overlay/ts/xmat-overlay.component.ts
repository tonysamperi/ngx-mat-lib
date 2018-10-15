import {Component, ElementRef, AfterViewInit, Input, OnDestroy, OnInit} from "@angular/core";
import {XmatOverlayStyles} from "../../xmat-models/index";

const invalidDisplayValues = ["inline", "none"];

@Component({
    selector: "xmat-overlay",
    template: `
        <ng-content></ng-content>`,
    styleUrls: ["../scss/xmat-overlay.component.scss"],
    host: {
        "[class.xmat-overlay]": "true",
        "[class.xmat-overlay-light]": "isLight",
        "[class.xmat-overlay-dark]": "isDark"
    }
})


export class XmatOverlayComponent implements AfterViewInit, OnDestroy, OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input("overlayStyle") private _overlayStyle: XmatOverlayStyles;

    private _parentStyleBak: { [key: string]: string } = {};

    isLight: boolean = false;
    isDark: boolean = false;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.isLight = this._overlayStyle === XmatOverlayStyles.LIGHT;
        this.isDark = this._overlayStyle === XmatOverlayStyles.DARK;
    }

    ngAfterViewInit(): void {

        const $xmatOverlay = this.elementRef.nativeElement;
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
        const $xmatOverlay = this.elementRef.nativeElement;
        const $overlayContainer = $xmatOverlay.parentNode;
        if (!!$overlayContainer && !!$overlayContainer.style) {
            $overlayContainer.style.display = this._parentStyleBak.display;
            $overlayContainer.style.position = this._parentStyleBak.position;
        }
    }

}
