import { NgModule } from "@angular/core";
import { XmatKebabCasePipe } from "./xmat-kebab-case.pipe";
import { XmatObjectToArrayPipe } from "./xmat-object-to-array.pipe";

@NgModule({
    declarations: [
        XmatKebabCasePipe,
        XmatObjectToArrayPipe,
    ],
    exports: [
        XmatKebabCasePipe,
        XmatObjectToArrayPipe,
    ],
    providers: []
})
export class XmatPipesModule {
}

export { XmatKebabCasePipe } from "./xmat-kebab-case.pipe";
export { XmatObjectToArrayPipe } from "./xmat-object-to-array.pipe";
