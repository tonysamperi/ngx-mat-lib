import {Injectable} from '@angular/core';

@Injectable()
export class XmatSharedDataService {

    private _ubiData: object = {};

    public set(key: string, data: any) {
        this._ubiData[key] = data;
    }

    public get(key: string): any {
        return this._ubiData[key];
    }

    public pop(key: string): any {
        let result = this._ubiData[key];
        // If the property can't be deleted echo an error.
        if (!delete this._ubiData[key]) {
            console.warn("COULDN'T DELETE PROP \"" + key + "\"FROM Shared");
        }
        return result;
    }

}