import {Injectable} from "@angular/core";
import {XmatMock} from "../models/index";

@Injectable()
export class XmatMocksListService {

    protected _mocks: XmatMock[];

    constructor() {
    }

    public get() {
        return this._mocks;
    }

    public set(mocks: XmatMock[]) {
        this._mocks = mocks;
    }
}
