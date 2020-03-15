import {Injectable} from "@angular/core";
import {XmatGenericObject} from "../models/index";

@Injectable()
export class XmatSharedDataService {

    private _xmatData: XmatGenericObject = {};

    public set(key: string, data: any) {
        this._xmatData[key] = data;
    }

    public get(key: string): any {
        return this._xmatData[key];
    }

    public pop(key: string): any {
        const result = this._xmatData[key];
        // If the property can"t be deleted echo an error.
        if (!delete this._xmatData[key]) {
            console.warn(`COULDN'T DELETE PROP ${key} FROM Shared`);
        }
        return result;
    }

}
