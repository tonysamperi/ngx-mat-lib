import {Component} from "@angular/core";
import {XmatSummaryConfig} from "ngx-mat-lib";

//

@Component({
    selector: "xmat-utils",
    templateUrl: "./xmat-utils.component.html",
    styleUrls: ["./xmat-utils.component.scss"]
})

export class XmatUtilsComponent {

    summary: XmatSummaryConfig = {
        data: {
            firstName: "Barry",
            lastName: "Allen",
            role: "Forensis scientist @ CCPD",
            location: "Central City",
            alias: "The Flash",
            hideout: "S.T.A.R. Labs"
        },
        labelsMap: {
            firstName: "First name",
            lastName: "Last name",
            role: "Role",
            location: "Location",
            hideout: "Hideout"
        },
        columns: {
            lg: 2,
            xl: 2,
            md: 2
        }
    };

    constructor() {

    }


}
