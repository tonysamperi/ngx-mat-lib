import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";

const transcludedHeaderSelector: string = ".xmat-accordion-title";
// const transcludedContentSelector: string = ".xmat-accordion-content";

@Component({
    selector: "xmat-accordion",
    styleUrls: ["../scss/xmat-accordion.component.scss"],
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="isExpanded">
                <mat-expansion-panel-header #xmatAccordionHeader>
                    <mat-panel-title>
                        <ng-content select=".xmat-accordion-title"></ng-content>
                    </mat-panel-title>
                    <mat-panel-description>
                        <ng-content select=".xmat-accordion-desc"></ng-content>
                    </mat-panel-description>
                </mat-expansion-panel-header>
                <ng-content select=".xmat-accordion-content"></ng-content>
            </mat-expansion-panel>
        </mat-accordion>
    `,
})


export class XmatAccordionComponent implements AfterViewInit {

    @Input("expanded") isExpanded: boolean;
    @ViewChild("xmatAccordionHeader") private _xmatAccordionHeader: any; // TODO find out type

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
