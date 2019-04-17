import {Routes} from "@angular/router";
import {
    XmatHomeComponent,
    XmatDialogExamplesComponent,
    XmatDownloadComponent,
    XmatRestExamplesComponent,
} from "../views/public";

export interface XmatRoute {
    href: string;
    background: string;
    title: string;
    desc: string;
    icon: string;
    routeKey: string;
}

export enum XmatRoutesUrlsMap {
    home = "home",
    download = "download",
    dialog = "dialog",
    rest = "rest"
}

export const xmatRoutes: Routes = [
    {
        path: XmatRoutesUrlsMap.home,
        canActivate: [],
        component: XmatHomeComponent,
        data: {
            key: XmatRoutesUrlsMap.home,
            label: "Home",
            mainMenu: !0,
        }
    },
    {
        path: XmatRoutesUrlsMap.dialog,
        canActivate: [],
        component: XmatDialogExamplesComponent,
        data: {
            key: XmatRoutesUrlsMap.dialog,
            label: "Dialog examples",
            mainMenu: !0,
        }
    },
    {
        path: XmatRoutesUrlsMap.download,
        canActivate: [],
        component: XmatDownloadComponent,
        data: {
            key: XmatRoutesUrlsMap.download,
            label: "Frontend download",
            mainMenu: !0,
        }
    },
    {
        path: XmatRoutesUrlsMap.rest,
        canActivate: [],
        component: XmatRestExamplesComponent,
        data: {
            key: XmatRoutesUrlsMap.rest,
            label: "Rest tools",
            mainMenu: !0,
        }
    },
    {
        path: "",
        redirectTo: XmatRoutesUrlsMap.home,
        pathMatch: "full"
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: XmatRoutesUrlsMap.home
    }
];
