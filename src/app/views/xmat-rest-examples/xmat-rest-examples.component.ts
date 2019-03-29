import {Component, OnDestroy, OnInit} from "@angular/core";
import {XmatTestRestService} from "../../services/xmat-test-rest.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: "xmat-test",
    templateUrl: "./xmat-rest-examples.component.html"
})

export class XmatRestExamplesComponent implements OnInit, OnDestroy {

    statusA: string = "idle";
    statusB: string = "idle";
    statusC: string = "idle";
    dataA: any;
    dataB: any;
    dataC: any;

    constructor(private _rest: XmatTestRestService) {

    }

    ngOnInit(): void {
        const myConfigA = this._rest.servicesConfigs.getOuRoles("abc", "def");
        this.statusA = "processing...";
        this.dataA = void 0;
        this._rest.$http(myConfigA).subscribe(response => {
            this.dataA = response;
            this.statusA = "success";
        }, () => {
            this.statusA = "fail";
        });

        const myConfigB = this._rest.servicesConfigs.accountsByGid.get("5");
        this.statusB = "processing...";
        this.dataB = void 0;
        this._rest.$http(myConfigB).subscribe(response => {
            this.dataB = response;
            this.statusB = "success";
        }, (error: HttpErrorResponse) => {
            this.statusB = `fail ${error.status}`;
        });

        const myConfigC = this._rest.servicesConfigs.getRequestsByUid("ABCDEF1");
        this.statusC = "processing...";
        this.dataC = void 0;
        this._rest.$http(myConfigC).subscribe(response => {
            this.dataC = response;
            this.statusC = "success";
        }, (error: HttpErrorResponse) => {
            this.statusC = `fail ${error.status}`;
        });
    }

    ngOnDestroy(): void {

    }
}
