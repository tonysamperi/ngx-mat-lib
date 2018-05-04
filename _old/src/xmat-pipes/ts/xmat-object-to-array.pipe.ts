import {Pipe, PipeTransform} from "@angular/core";
import {ArrayItemToObject} from "./xmat-object-to-array.model";
import * as _ from "lodash";


@Pipe({name: 'objectToArray'})
export class XmatObjectToArrayPipe implements PipeTransform {

    transform(object: { [param: string]: any }, limitTo: number = -1): ArrayItemToObject[] {
        if (!object || object !== Object(object) || Array.isArray(object)) {
            return void 0;
        }
        !!limitTo || (limitTo = Object.keys(object).length);
        let keys = [];
        _.each(Object.keys(object), (key, index) => {
            keys.push({key: key, value: object[key]});
            //Breaks when limit is reached
            return index > limitTo;
        });
        return keys;
    }
}