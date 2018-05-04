import {Component, Input, OnInit} from "@angular/core";
import {XmatStatesLabelsMap, XmatStates} from "./xmat-states.model";

@Component({
    selector: "xmat-states-legend",
    templateUrl: "../tpl/xmat-states-legend.component.html",
    styleUrls: ["../scss/xmat-states-legend.component.scss"]
})

export class XmatStatesLegendComponent implements OnInit {

    @Input("items") itemsToShow: XmatStates[];

    public legendItems = [];

    constructor() {

    }

    ngOnInit() {
        this.itemsToShow.forEach(item => {
            let desc = XmatStatesLabelsMap[item];
            !!desc && this.legendItems.push({
                className: XmatStates[item],
                description: desc
            });
        })
    }
}
