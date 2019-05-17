import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {XmatLibTestModule} from "./app/app.module";
import {xmatEnvironment} from "./environments/environment";

if (xmatEnvironment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(XmatLibTestModule);
