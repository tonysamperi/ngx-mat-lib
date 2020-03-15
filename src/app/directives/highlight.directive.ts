import {Directive, ElementRef, AfterViewInit} from "@angular/core";
//
import * as hljs from "highlight.js";

@Directive({
    selector: "code[highlight]",
})
export class XmatHighlightDirective implements AfterViewInit {

    constructor(private _elRef: ElementRef) {
    }

    ngAfterViewInit() {
        hljs.highlightBlock(this._elRef.nativeElement);
    }

}
