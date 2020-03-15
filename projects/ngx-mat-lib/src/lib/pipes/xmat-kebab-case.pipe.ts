import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "kebabcase" })
export class XmatKebabCasePipe implements PipeTransform {
    /**
     * @param value The string to transform to upper case.
     */
    transform(value: string): string {
        if (!value) {
            return value;
        }
        if (typeof value !== "string") {
            throw Error(`Invalid type provided for XmatKebabCasePipe: expected string, got ${typeof value}`);
        }
        return value.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();
    }
}
