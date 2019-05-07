import {Component} from "@angular/core";
import {XmatRoute} from "../../models/public";
import {XmatRoutesService} from "../../services/xmat-routes.service";

@Component({
    selector: "xmat-menu",
    templateUrl: "./xmat-menu.component.html",
    styleUrls: ["./xmat-menu.component.scss"]
})

export class XmatMenuComponent {

    menuItems: XmatRoute[] = [];


    constructor(private _xmatRoutesSrv: XmatRoutesService) {
        this._printButtons();
    }

    protected _printButtons(): void {
        this.menuItems = this._xmatRoutesSrv.generateXmatRoutesItems("mainMenu");
    }

}
