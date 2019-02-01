import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {XmatLibTestModule} from "./app/app.module";
import {environment} from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(XmatLibTestModule)
.catch(err => console.error(err));
