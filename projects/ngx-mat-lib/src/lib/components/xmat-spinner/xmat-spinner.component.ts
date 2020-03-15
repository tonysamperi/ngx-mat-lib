import {Component, ElementRef, AfterViewInit, Input, ViewChild} from "@angular/core";
import {MatSpinner} from "@angular/material";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

const defaultDiameter = 100;

@Component({
    selector: "xmat-spinner",
    templateUrl: "./xmat-spinner.component.html",
    styleUrls: ["./xmat-spinner.component.scss"],
    host: {
        "[class.xmat-d-none]": "!show"
    }
})
export class XmatSpinnerComponent implements AfterViewInit {

    @ViewChild(MatSpinner) spinner: MatSpinner;

    @Input()
    set show(newValue: boolean) {
        this._show = coerceBooleanProperty(newValue);
    }

    get show(): boolean {
        return this._show;
    }

    @Input() customParent: string;
    @Input() diameter: number = defaultDiameter;

    protected _show: boolean = !1;

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
