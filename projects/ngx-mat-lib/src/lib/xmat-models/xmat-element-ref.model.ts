import {ElementRef} from "@angular/core";

export class XmatElementRef<T = any> extends ElementRef {

    public nativeElement: T;

    constructor(nativeElement: T) {
        super(nativeElement);
    }

}
