import {Pipe, PipeTransform} from "@angular/core";
//
import {XmatArrayItemFromObject, XmatGenericObject} from "../xmat-models/index";
//
import {forEach} from "lodash";


@Pipe({name: "objectToArray"})
export class XmatObjectToArrayPipe implements PipeTransform {

    transform(object: XmatGenericObject, limitTo: number = -1): XmatArrayItemFromObject[] {
        if (!object || object !== Object(object) || Array.isArray(object)) {
            return void 0;
        }
        !!limitTo || (limitTo = Object.keys(object).length);
        const keys = [];
        forEach(Object.keys(object), (key, index) => {
            keys.push({key: key, value: object[key]});
            // Breaks when limit is reached
            return index > limitTo;
        });
        return keys;
    }
}
