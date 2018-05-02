import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {XmatConstantsService} from "../xmat-services/xmat-constants.service";
import {XmatRestService} from "./ts/xmat-rest.service"

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        XmatConstantsService,
        XmatRestService
    ]
})
export class XmatRestModule {
}