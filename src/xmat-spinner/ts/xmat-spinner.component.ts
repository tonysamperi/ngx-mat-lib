import {Component, ElementRef, AfterViewInit, Input, ViewChild} from "@angular/core";
import {MatSpinner} from "@angular/material";

const defaultDiameter = 100;

@Component({
    selector: "xmat-spinner",
    // templateUrl: "../tpl/xmat-spinner.component.html",
    template: `
        <mat-spinner
                class="xmat-spinner"
                [diameter]="diameter"
                [hidden]="!showSpinner"></mat-spinner>
    `,
    styleUrls: ["../scss/xmat-spinner.component.scss"]
})
export class XmatSpinnerComponent implements AfterViewInit {

    @Input("diameter") diameter: number = defaultDiameter;

    @ViewChild(MatSpinner) spinner: MatSpinner;

    constructor(private elementRef: ElementRef) {
        this.diameter > 0 || (this.diameter = defaultDiameter);
    }

    ngAfterViewInit() {
        let spinnerMargin = "-" + this.diameter / 2 + "px";
        const $spinner = this.spinner._elementRef.nativeElement;
        const $element = this.elementRef.nativeElement;
        $spinner.style.margin = spinnerMargin;
        $element.parentNode.style.position = "relative";
    }

}