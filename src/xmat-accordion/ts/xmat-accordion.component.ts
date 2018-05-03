import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";

const transcludedHeaderSelector = ".xmat-accordion-title";
const transcludedContentSelector = ".xmat-accordion-content";

@Component({
    selector: "xmat-accordion",
    templateUrl: "../tpl/xmat-accordion.component.html",
    styleUrls: ["../scss/xmat-accordion.component.scss"]
})


export class XmatAccordionComponent implements AfterViewInit {

    @Input("expanded") isExpanded: boolean;
    @ViewChild('xmatAccordionHeader') private _xmatAccordionHeader;

    /**
     * ua = viewModel
     * this is meant to contain data used from the view
     */
    public ua = {};

    constructor() {
    }

    ngAfterViewInit() {
        let $header = this._xmatAccordionHeader._element.nativeElement;
        let $panel = $header.parentElement;
        if ($header.querySelectorAll(transcludedHeaderSelector).length === 0) {
            $panel.removeChild($header);
            $panel.classList.add("xmat-accordion-no-header");
        }
    }


}