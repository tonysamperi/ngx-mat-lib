import {Injectable} from "@angular/core";

@Injectable()
export class XmatSharedDataService {

    private _xmatData: { [key: string]: any } = {};

    public set(key: string, data: any) {
        this._xmatData[key] = data;
    }

    public get(key: string): any {
        return this._xmatData[key];
    }

    public pop(key: string): any {
        let result = this._xmatData[key];
        // If the property can"t be deleted echo an error.
        if (!delete this._xmatData[key]) {
            console.warn(`COULDN'T DELETE PROP ${key} FROM Shared`);
        }
        return result;
    }

}
