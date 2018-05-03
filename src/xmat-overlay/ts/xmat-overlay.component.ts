import {Component, ElementRef, AfterViewInit, Input} from "@angular/core";

export enum xmatOverlayStyles {
    dark,
    light
}

@Component({
    selector: "xmat-overlay",
    templateUrl: "../tpl/xmat-overlay.component.html",
    styleUrls: ["../scss/xmat-overlay.component.scss"],
    host: {
        "[class.xmat-overlay-light]": "isLight"
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
        this.isLight = this._overlayStyle === xmatOverlayStyles[xmatOverlayStyles.light]
    }

}