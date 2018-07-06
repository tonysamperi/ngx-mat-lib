import {XmatLegendItemContentComponent} from "./xmat-legend-item-content.component";

export interface XmatLegendItem {
    image?: string;
    color?: string;
    className: string | string[];
    content: string | XmatLegendItemContentComponent;
}

export type XmatLegendLayout =
    | "grid"
    | "list";

export class XmatLegendLayouts {
    static GRID: XmatLegendLayout = "grid";
    static LIST: XmatLegendLayout = "list";
}
