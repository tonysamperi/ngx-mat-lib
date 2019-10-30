import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {XmatHttpParams, XmatHttpConfig} from "ngx-mat-lib";
//
import {XmatTestRestService} from "../../services/xmat-test-rest.service";

export enum XmatRestStates {
    RUNNING = "RUNNING",
    IDLE = "IDLE",
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
}

@Component({
    selector: "xmat-test",
    templateUrl: "./xmat-rest-examples.component.html"
})

export class XmatRestExamplesComponent implements OnInit {

    patchData: any;
    states: typeof XmatRestStates = XmatRestStates;
    //
    preDelay: number = 2000;
    postDelay: number = 3000;
    //
    statusA: XmatRestStates = XmatRestStates.IDLE;
    statusB: XmatRestStates = XmatRestStates.IDLE;
    statusC: XmatRestStates = XmatRestStates.IDLE;
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

    doPatch(): void {
        this.patchData = void 0;
        const config = this._rest.servicesConfigs.testPatch();
        config.data = {
            foo: "bar",
            goo: "car"
        };
        this._rest.$http(config).subscribe(response => {
            console.info("PATCH SUCCESS", response);
            this.patchData = response;
        }, (error: HttpErrorResponse) => {
            console.info("PATCH FAIL", error);
        });
    }

    doQueue(): void {
        this._rest.$allMap({
            first: this._configB,
            second: this._configC
        })
        .subscribe((response: any) => {
            console.info("$all response", response);
        });
    }

    ngOnInit(): void {
        this._callA();
        this._callB();
        this._callC();
    }

    reloadA(): void {
        this._callA();
    }

    // Private

    protected _callA(): void {
        const myConfigA = this._rest.servicesConfigs.postUsers();
        myConfigA.params = new XmatHttpParams(this.preDelay, this.postDelay);
        this.statusA = XmatRestStates.RUNNING;
        this.dataA = this.timeA = void 0;
        const startA = +new Date();
        this._rest.$http(myConfigA).subscribe(response => {
            console.info("GOT RESPONSE FOR callA", response);
            this.dataA = response;
            this.statusA = XmatRestStates.SUCCESS;
            this.timeA = +new Date() - startA;
        }, () => {
            this.statusA = XmatRestStates.FAIL;
        });
    }

    protected _callB(): void {
        this.statusB = XmatRestStates.RUNNING;
        this.dataB = void 0;
        this._rest.$http(this._configB).subscribe(response => {
            this.dataB = response;
            this.statusB = XmatRestStates.SUCCESS;
        }, (error: HttpErrorResponse) => {
            console.warn("callB errored", error);
            this.statusB = XmatRestStates.FAIL;
        });
    }

    protected _callC(): void {
        this.statusC = XmatRestStates.RUNNING;
        this.dataC = void 0;
        this._rest.$http(this._configC).subscribe(response => {
            this.dataC = response;
            this.statusC = XmatRestStates.SUCCESS;
        }, (error: HttpErrorResponse) => {
            console.warn("callC errored", error);
            this.statusC = XmatRestStates.FAIL;
        });
    }
}
