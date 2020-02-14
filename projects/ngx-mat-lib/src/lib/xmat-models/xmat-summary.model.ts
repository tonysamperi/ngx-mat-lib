import { XmatGenericObject } from "./xmat-generic-object";
import { XmatBreakpointKeys } from "./xmat-breakpoints.model";

type XmatBreakpointRef = { [key in keyof typeof XmatBreakpointKeys]?: number };

export interface XmatSummaryConfig<T extends object = any> {
    data: T;
    columns?: XmatBreakpointRef;
    labelsMap?: XmatGenericObject<string>;
    noCapitalize?: boolean;
    printMap?: XmatGenericObject<(v) => string | number>;
    props?: string[];
}
