import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaObserver } from "@angular/flex-layout";
//
import { XmatMediaQueryStateComponent, XmatMediaService } from "./xmat-media-query-state.component";

export * from "./xmat-media-query-state.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        XmatMediaQueryStateComponent
    ],
    providers: [
        XmatMediaService
    ],
    exports: [
        XmatMediaQueryStateComponent
    ]
})
export class XmatMediaQueryStateModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: XmatMediaQueryStateModule,
            providers: [
                { provide: MediaObserver, useValue: XmatMediaService, multi: true },
            ]
        };
    }
}
