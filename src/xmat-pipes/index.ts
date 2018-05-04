import {NgModule} from "@angular/core";
import {XmatObjectToArrayPipe} from "./ts/xmat-object-to-array.pipe";

@NgModule({
    declarations: [
        XmatObjectToArrayPipe
    ],
    exports: [
        XmatObjectToArrayPipe
    ],
    providers: [

    ]
})
export class XmatPipesModule {}

export {XmatObjectToArrayPipe} from "./ts/xmat-object-to-array.pipe";
export {ArrayItemToObject} from "./ts/xmat-object-to-array.model";
