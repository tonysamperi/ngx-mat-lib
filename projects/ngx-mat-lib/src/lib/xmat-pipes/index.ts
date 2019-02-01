import {NgModule} from "@angular/core";
import {XmatObjectToArrayPipe} from "./xmat-object-to-array.pipe";

@NgModule({
    declarations: [
        XmatObjectToArrayPipe
    ],
    exports: [
        XmatObjectToArrayPipe
    ],
    providers: []
})
export class XmatPipesModule {
}

export {XmatObjectToArrayPipe} from "./xmat-object-to-array.pipe";
