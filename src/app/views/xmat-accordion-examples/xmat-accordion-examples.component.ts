import {Component} from "@angular/core";

@Component({
    selector: "xmat-accordion-examples",
    templateUrl: "./xmat-accordion-examples.component.html",
    styleUrls: ["./xmat-accordion-examples.component.scss"]
})

export class XmatAccordionExamplesComponent {

    accordionOpened: boolean = !0;
    accordionDisabled: boolean = !0;
    accordionBOpened: boolean = !0;

    constructor() {

    }


}
