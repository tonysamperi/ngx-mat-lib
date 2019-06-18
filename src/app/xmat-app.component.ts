import {Component} from "@angular/core";
import {xmatEnvironment} from "../environments/environment";

@Component({
    selector: "xmat-app",
    templateUrl: "xmat-app.component.html",
    styleUrls: ["xmat-app.component.scss"]
})
export class XmatAppComponent {

    appVersion: string = xmatEnvironment.appVersion;

}
