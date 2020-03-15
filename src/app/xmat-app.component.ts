import {Component} from "@angular/core";
//
import * as appInfo from "../../package.json";

@Component({
    selector: "xmat-app",
    templateUrl: "xmat-app.component.html",
    styleUrls: ["xmat-app.component.scss"]
})
export class XmatAppComponent {

    appVersion: string = (appInfo as any).version;

}
