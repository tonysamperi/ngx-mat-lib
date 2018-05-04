import {Component} from "@angular/core";
import {XmatSharedDataService} from "../../xmat-services/xmat-shared-data.service";

@Component({
    selector: "xmat-menu",
    templateUrl: "../tpl/menu.component.html",
    styleUrls: ["../scss/menu.component.scss"]
})


export class XmatMenuComponent {

    menuItems = [];

    constructor(protected _xmatSharedService: XmatSharedDataService) {

        let routes = _xmatSharedService.get("routes");

        for (let route of routes) {
            if (!!route.data && route.data.mainMenu) {
                this.menuItems.push({
                    href: route.path,
                    label: route.data.label || route.path,
                });
            }
        }
    }

}