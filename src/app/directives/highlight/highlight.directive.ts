import {Directive, ElementRef, HostBinding, OnInit, AfterViewInit, Input} from "@angular/core";
import {XmatGenericObject} from "ngx-mat-lib";
//
import * as hljs from "highlight.js";

@Directive({
    selector: "[highlight]",
})
export class XmatHighlightDirective implements OnInit, AfterViewInit {

    @Input()
    type: "html" | void;

    @HostBinding("class") hostKlass: string;

    private _klasses: XmatGenericObject<string> = {
        html: "language-html"
    };

    constructor(private _elRef: ElementRef) {
    }

    ngOnInit(): void {
        this.type && (this.hostKlass = this._klasses[this.type]);
    }

    ngAfterViewInit(): void {
        hljs.highlightBlock(this._elRef.nativeElement);
    }

}
