import {Component, ElementRef, AfterViewInit, Input, ViewChild} from "@angular/core";
import {MatSpinner} from "@angular/material";

const defaultDiameter = 100;

@Component({
    selector: "xmat-spinner",
    templateUrl: "../tpl/xmat-spinner.component.html",
    styleUrls: ["../scss/xmat-spinner.component.scss"]
})
export class XmatSpinnerComponent implements AfterViewInit {

    @Input("diameter") diameter: number = defaultDiameter;

    @Input("customParent") customParent: string;

    @ViewChild(MatSpinner) spinner: MatSpinner;

    constructor(private elementRef: ElementRef) {
        this.diameter > 0 || (this.diameter = defaultDiameter);
    }

    ngAfterViewInit() {
        const spinnerMargin = "-" + this.diameter / 2 + "px";
        const $spinner = this.spinner._elementRef.nativeElement;
        const $element = this.elementRef.nativeElement;
        $spinner.style.margin = spinnerMargin;
        if (!this.customParent) {
            const $parent = $element.parentNode;
            !!$parent && ($parent.style.position = "relative");
        }
        else {
            const $container = $element.closest(this.customParent);
            !!$container && ($container.style.position = "relative");
        }
    }

}
