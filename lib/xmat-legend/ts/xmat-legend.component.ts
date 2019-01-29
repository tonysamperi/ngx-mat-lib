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
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {XmatLegendItemStyle} from "./xmat-legend.model";
import * as _ from "lodash";

const xmatLegendDefaultCols: number = 4;

@Component({
    selector: "xmat-legend",
    templateUrl: "../tpl/xmat-legend.component.html",
    styleUrls: ["../scss/xmat-legend.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class XmatLegendComponent {


    @Input()
    get fillColumns(): boolean {
        return this._fillColumns;
    }

    set fillColumns(newValue: boolean) {
        this._fillColumns = coerceBooleanProperty(newValue);
    }

    @Input()
    get columns(): number {
        return this._columns;
    }

    set columns(newValue: number) {
        console.info("columns", newValue);
        if (!isNaN(+newValue) && +newValue > 0) {
            this._columns = Math.floor(+newValue);
            this._updateItemStyle();
            this._legendInit();
        }
        else {
            this._columns = xmatLegendDefaultCols;
            console.error("XmatLegend invalid length provided, setting to default", newValue);
        }
    }

    @Input()
    get items(): XmatLegendItem[] {
        return this._items;
    }

    set items(newValue: XmatLegendItem[]) {
        this._items = newValue;
        this._legendInit();
    }

    @Input() layout: XmatLegendLayout = XmatLegendLayouts.GRID;

    itemStyle: XmatLegendItemStyle = {
        "flex": `1 0 ${100 / xmatLegendDefaultCols}%`
    };

    private _columns: number = xmatLegendDefaultCols;
    private _fillColumns: boolean = !0;
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
        if (!Array.isArray(this.items)) {
            console.warn("XmatLegend list was not ready. Init prevented.");
            return !1;
        }
        if (this._fillColumns) {
            const fillerCount = (this._columns - (this.items.length % this._columns)) % this._columns;
            _.each(new Array(fillerCount), () => {
                    this.items.push({
                        content: `<span style="display: none"></span>`,
                        className: "xmat-grid-fill"
                    } as XmatLegendItem);
                }
            );
        }

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

    private _updateItemStyle(): XmatLegendItemStyle {
        console.info("updating item style...", this._columns);
        this.itemStyle = {
            "flex": `1 0 ${100 / this._columns}%`
        };
        console.info("item style updated", this.itemStyle);
        return this.itemStyle;
    }

}
