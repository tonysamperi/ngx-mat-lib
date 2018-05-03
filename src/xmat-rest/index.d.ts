import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {XmatConstantsService} from "../xmat-services/xmat-constants.service";
import {XmatRestService} from "./ts/xmat-rest.service"

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        XmatConstantsService,
        XmatRestService
    ]
})
export class XmatRestModule {
}

export {XmatRestService} from "./ts/xmat-rest.service";