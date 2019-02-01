import {XmatGenericObject} from "./xmat-generic-object";

export interface XmatLibStruct {
    restTimes: XmatGenericObject<number>;
}

export const XmatLib: XmatLibStruct = {
    restTimes: {}
};
