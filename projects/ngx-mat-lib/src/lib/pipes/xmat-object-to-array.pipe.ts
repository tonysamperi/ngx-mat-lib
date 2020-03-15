import { Pipe, PipeTransform, Injectable } from "@angular/core";
//
import { XmatSelect, XmatGenericObject } from "../models/index";
//
import { forEach } from "lodash";

@Injectable()
@Pipe({ name: "objectToArray", pure: !1 })
export class XmatObjectToArrayPipe implements PipeTransform {
  transform<T>(object: XmatGenericObject<T>, limitTo?: number): XmatSelect<T>[] {
    if (!object || object !== Object(object) || Array.isArray(object)) {
      return void 0;
    }
    (limitTo !== void 0) || (limitTo = Object.keys(object).length);
    const keys = [];
    forEach(Object.keys(object), (key, index) => {
      keys.push({ key: key, value: object[key] });
      // Breaks when limit is reached
      return index < limitTo - 1;
    });
    return keys;
  }
}
