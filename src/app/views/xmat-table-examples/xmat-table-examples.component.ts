import {Component, ViewEncapsulation} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {XmatFunctionsService, XmatSimpleTable} from "ngx-mat-lib";
//
import {XmatTestRestService} from "../../services/xmat-test-rest.service";
//
import {map as map_} from "lodash";
import {finalize, map} from "rxjs/operators";

interface XmatUsersResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

@Component({
    selector: "xmat-table-examples",
    templateUrl: "./xmat-table-examples.component.html",
    styleUrls: ["./xmat-table-examples.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class XmatTableExamplesComponent {

    showSpinner: boolean = !1;
    tableConfig: XmatSimpleTable<XmatUsersResponse>;

    constructor(private _xmatRestSrv: XmatTestRestService,
                private _xmatFunctionsSrv: XmatFunctionsService) {
        this._getData();
    }

    protected _getData(): void {
        this.showSpinner = !0;
        const getUsersConfig = this._xmatRestSrv.servicesConfigs.getUsers();
        this._xmatRestSrv.$http(getUsersConfig)
        .pipe(
            finalize(() => this.showSpinner = !1),
            map((raw: { data: XmatUsersResponse[] }) => {
                return map_(raw.data, (row) => {
                    return {
                        ...row,
                        avatar: `<span class="avatar"><img src="${row.avatar}" alt="${row.first_name} ${row.last_name}" /></span>`

                    } as XmatUsersResponse;
                });
            })
        )
        .subscribe((mapped: XmatUsersResponse[]) => {

            const narrowCenteredKlass = "xmat-flex-justify-center table-col-60";

            this.tableConfig = {
                cols: [
                    {key: "id", label: "ID", order: 0, tdKlass: narrowCenteredKlass, thKlass: narrowCenteredKlass},
                    {key: "first_name", label: "First name", order: 1},
                    {key: "last_name", label: "Last name", order: 2},
                    {key: "email", label: "e-mail", order: 3},
                    {
                        key: "avatar",
                        label: "",
                        order: 4,
                        tdKlass: narrowCenteredKlass,
                        thKlass: narrowCenteredKlass,
                        isHTML: !0
                    },
                ],
                dataSource: new MatTableDataSource<XmatUsersResponse>(mapped),
            };
        }, (response: HttpErrorResponse) => {
            console.error("xmat-table-example ==> $http failed", response);
            this._xmatFunctionsSrv.showErrorSnackBar("Error while getting data");
        });
    }

}
