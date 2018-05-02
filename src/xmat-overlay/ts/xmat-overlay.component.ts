import {Component, ElementRef, AfterViewInit, Input} from "@angular/core";

export enum ubiOverlayStyles {
    dark = "dark",
    light = "light"
}

@Component({
    selector: "ubi-overlay",
    templateUrl: "../tpl/ubi-overlay.component.html",
    styleUrls: ["../scss/ubi-overlay.component.scss"],
    host: {
        "[class.ubi-overlay-light]": "isLight"
    }
})


export class XmatOverlayComponent implements AfterViewInit {

    @Input("overlayStyle") _overlayStyle: string;

    isLight: boolean = false;

    constructor(private elementRef: ElementRef) {
    }


    ngAfterViewInit() {
        const element = this.elementRef.nativeElement;
        element.parentNode.style.position = "relative";
        this.isLight = this._overlayStyle === ubiOverlayStyles.light
    }

}