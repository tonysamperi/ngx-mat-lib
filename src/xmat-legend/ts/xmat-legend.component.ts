import {
    Component,
    ComponentRef,
    ComponentFactoryResolver,
    Input,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {XmatLegendItemContentComponent} from "./xmat-legend-item-content.component";
import {XmatLegendItem, XmatLegendLayout, XmatLegendLayouts} from "./xmat-legend.model";
import * as _ from "lodash";

@Component({
    selector: "xmat-legend",
    templateUrl: "../tpl/xmat-legend.component.html",
    styleUrls: ["../scss/xmat-legend.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class XmatLegendComponent implements OnInit {

    @Input() items: XmatLegendItem[];

    @Input() layout: XmatLegendLayout = XmatLegendLayouts.GRID;

    private _itemContentClass = XmatLegendItemContentComponent;
    private _itemContentRef: ComponentRef<XmatLegendItemContentComponent>;

    constructor(private _resolver: ComponentFactoryResolver,
                private _viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {
        _.each(this.items, (item: XmatLegendItem) => {
            if (typeof item.content === "string") {
                const tmpComp = this._constructContent();
                const old = item.content;
                item.content = tmpComp;
                item.content.content = old;
            }
            else if (item.content instanceof XmatLegendItemContentComponent) {
                // Valid
            }
            else {
                // Hide broken ones?
            }

        });
    }


    private _constructContent(): XmatLegendItemContentComponent {
        const factory = this._resolver.resolveComponentFactory(this._itemContentClass);
        this._itemContentRef = this._viewContainerRef.createComponent(factory);
        return this._itemContentRef.instance as XmatLegendItemContentComponent;
    }

}
