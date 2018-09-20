import {
    Component,
    ComponentRef,
    ComponentFactoryResolver,
    Input,
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

export class XmatLegendComponent {

    @Input()
    get items(): XmatLegendItem[] {
        return this._items;
    }

    set items(newValue: XmatLegendItem[]) {
        this._items = newValue;
        this._legendInit();
    }

    @Input() layout: XmatLegendLayout = XmatLegendLayouts.GRID;

    private _items: XmatLegendItem[];
    private _itemContentClass = XmatLegendItemContentComponent;
    private _itemContentRef: ComponentRef<XmatLegendItemContentComponent>;

    constructor(private _resolver: ComponentFactoryResolver,
                private _viewContainerRef: ViewContainerRef) {

    }

    private _constructContent(): XmatLegendItemContentComponent {
        const factory = this._resolver.resolveComponentFactory(this._itemContentClass);
        this._itemContentRef = this._viewContainerRef.createComponent(factory);
        return this._itemContentRef.instance as XmatLegendItemContentComponent;
    }

    private _legendInit() {

        _.each(new Array(this.items.length % 4), () => {
            this.items.push({
                content: `<span style="display: none"></span>`
            } as XmatLegendItem);
        });

        _.each(this.items, (item: XmatLegendItem) => {
            if (typeof item.content === "string") {
                const tmpCompInstance = this._constructContent();
                // this._xmatFunctions.logWithStyle("XmatLegend", "Was String Content", "#006699", item.content);
                tmpCompInstance.content = item.content;
                item.content = tmpCompInstance;
            }
            else if (item.content instanceof XmatLegendItemContentComponent) {
                // Valid
                // this._xmatFunctions.logWithStyle("XmatLegend", "Was Instance Content", "#336699", item.content);
            }
            else {
                // this._xmatFunctions.logWithStyle("XmatLegend", "Was INVALID Content", "#CC0000", item.content);
                // Hide broken ones?
            }

        });
    }

}
