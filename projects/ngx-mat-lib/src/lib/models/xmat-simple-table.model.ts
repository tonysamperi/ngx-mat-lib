import {MatTableDataSource} from "@angular/material";
import {XmatGenericObject} from "./xmat-generic-object";

// TODO: add specific class for th-s and td-s?
export interface XmatSimpleTableCol {
    key: string;
    label: string;
    order?: number;
    thKlass?: string | string[];
    tdKlass?: string | string[];
    ifEmpty?: string;
    isHTML?: boolean;
}

export interface XmatSimpleTable<T = XmatGenericObject<string | number>> {
    cols: XmatSimpleTableCol[];
    dataSource: MatTableDataSource<T>;
    thKlass?: string | string[];
    tdKlass?: string | string[];
}
