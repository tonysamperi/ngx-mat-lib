import {Component, OnDestroy, OnInit} from "@angular/core";
import {XmatTestRestService} from "../../services/xmat-test-rest.service";
import {HttpErrorResponse} from "@angular/common/http";
import {XmatHttpParams, XmatHttpConfig} from "ngx-mat-lib";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
    selector: "xmat-test",
    templateUrl: "./xmat-rest-examples.component.html"
})

export class XmatRestExamplesComponent implements OnInit, OnDestroy {

    statusA: string = "idle";
    statusB: string = "idle";
    statusC: string = "idle";
    //
    dataA: any;
    dataB: any;
    dataC: any;
    //
    timeA: number;

    //
    protected _configB: XmatHttpConfig = this._rest.servicesConfigs.accountsByGid.get("5");
    protected _configC: XmatHttpConfig = this._rest.servicesConfigs.getRequestsByUid("ABCDEF1");

    constructor(private _rest: XmatTestRestService) {

    }

    ngOnInit(): void {
        this._callA();
        // this._callB();
        // this._callC();
        this._testQueueObj();
    }

    ngOnDestroy(): void {

    }

    reloadA(): void {
        this._callA();
    }

    // Private

    protected _callA(): void {
        // const myConfigA = this._rest.servicesConfigs.getOuRoles("abc", "def");
        const myConfigA = this._rest.servicesConfigs.postUsers();
        myConfigA.params = new XmatHttpParams(5000, 5000);
        this.statusA = "processing...";
        this.dataA = void 0;
        const startA = +new Date();
        this._rest.$http(myConfigA).subscribe(response => {
            console.info("GOT RESPONSE A", response);
            this.dataA = response;
            this.statusA = "success";
            this.timeA = +new Date() - startA;
        }, () => {
            this.statusA = "fail";
        });
    }

    protected _callB(): void {
        this.statusB = "processing...";
        this.dataB = void 0;
        this._rest.$http(this._configB).subscribe(response => {
            this.dataB = response;
            this.statusB = "success";
        }, (error: HttpErrorResponse) => {
            this.statusB = `fail ${error.status}`;
        });
    }

    protected _callC(): void {
        this.statusC = "processing...";
        this.dataC = void 0;
        this._rest.$http(this._configC).subscribe(response => {
            this.dataC = response;
            this.statusC = "success";
        }, (error: HttpErrorResponse) => {
            this.statusC = `fail ${error.status}`;
        });
    }

    protected _testQueueObj(): void {

        this._rest.$allMap({
            first: this._configB,
            second: this._configC
        })
        .subscribe((response: any) => {
            console.info("$all response", response);
        });
    }

}
