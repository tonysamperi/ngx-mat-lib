import {Injectable} from "@angular/core";
import {Route} from "@angular/router";
import {XmatRoute} from "../models/public";
import * as _ from "lodash";

@Injectable()
export class XmatRoutesService {

    get routes(): Route[] {
        return this._routes;
    }

    set routes(newValue: Route[]) {
        this._routes = [];
        if (Array.isArray(newValue)) {
            this._routes = newValue;
        }
    }

    protected _routes: Route[] = [];

    constructor() {

    }

    generateXmatRoutesItems(condition?: string): XmatRoute[] {
        const ds = "/";
        const result: XmatRoute[] = [];
        _.each(this._routes, route => {
            if (!!route.data) {
                if (!!condition && !route.data[condition]) {
                    return !0;
                }
                result.push({
                    href: ["", route.path].join(ds),
                    background: route.data.background,
                    title: route.data.label,
                    desc: route.data.desc,
                    icon: route.data.icon,
                    routeKey: route.data.routeKey
                });
            }
        });
        return result;
    }

}
