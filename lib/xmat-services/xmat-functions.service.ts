import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {
    XmatConfirmDialogComponent,
    XmatAlertDialogComponent
} from "../xmat-dialog/index";
import {
    XmatAlertDialogData,
    XmatAlertTypes,
    XmatAlertDialogActions,
    XmatConfirmDialogData,
    XmatSnackBarData
} from "../xmat-models/index";
import {
    XmatConstantsService,
    XMAT_CONSTANT_LABELS
} from "./xmat-constants.service";
import {
    XmatSnackBarComponent
} from "../xmat-snack-bar/index";
import * as _ from "lodash";
import {MatDialogRef} from "@angular/material";

const colorParams = {
    center: 128,
    diversity: 10,
    width: 127
};

const hexValues: string = "0123456789ABCDEF";

const byte2Hex = (n) => {
    // tslint:disable-next-line:no-bitwise
    return String(hexValues.substr((n >> 4) & 0x0F, 1)) + hexValues.substr(n & 0x0F, 1);
};

const rgb2Hex = (r, g, b) => {
    return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
};

const eachEnum = (srcEnum, iteratee) => {
    const target = [];
    _.each(srcEnum, (key, index) => {
        // Continue if key is not a number
        if (typeof srcEnum[key] !== typeof 0) {
            return true;
        }
        target.push(srcEnum[key]);
    });
    return _.each(target, iteratee);
};

const eachFrom = (array, index, iteratee) => {
    let _index = index == null ? -1 : index;
    const length = array == null ? 0 : array.length;

    while (++_index < length) {
        if (iteratee(array[_index], _index, array) === false) {
            break;
        }
    }
    return array;
};

@Injectable()
export class XmatFunctionsService {

    private _colorDb = {
        factor: colorParams.width + colorParams.center,
        frequency: Math.PI * 2 / colorParams.diversity,
        generated: []
    };

    private _confirmDialogDefaults: XmatConfirmDialogData = {
        confirmText: XMAT_CONSTANT_LABELS.confirm,
        cancelText: XMAT_CONSTANT_LABELS.cancel,
        dialogContent: XMAT_CONSTANT_LABELS.proceed,
        hideCancelButton: false,
        confirmColor: "warn",
        title: XMAT_CONSTANT_LABELS.warningTitle
    };

    private _defaultAlertData: XmatAlertDialogData = {
        type: XmatAlertTypes.warning,
        title: XMAT_CONSTANT_LABELS.warningTitle,
        confirmText: XMAT_CONSTANT_LABELS.confirm,
        cancelText: XMAT_CONSTANT_LABELS.cancel,
    };

    constructor(protected _dialog: MatDialog,
                protected  _snackBar: MatSnackBar,
                protected _xmatConstants: XmatConstantsService) {
    }

    /**
     * PUBLIC FUNCTIONS
     */
    addLeadingZeroes(n: number | string): string {
        return ("00" + n).slice(-2);
    }

    createReflectionModel(source, level = 0): any {
        // For both arrays and objects
        if (!!source && typeof source === typeof {}) {
            let target = {};
            if (Array.isArray(source)) {
                target = [];
            }
            const sourceKeys = Object.keys(source);
            for (let i = 0; i < sourceKeys.length; i++) {
                const key = sourceKeys[i];
                // Always create new key on the target, it will eventually be converted to object
                // For both arrays and objects
                if (!!source[key] && typeof source[key] === typeof {}) {
                    target[key] = this.createReflectionModel(source[key], level + 1);
                }
                else {
                    target[key] = void 0;
                }
            }
            return target;
        }
        else {
            console.error("Cannot create reflection of non object");
            return void 0;
        }
    }

    dateAddMonths(date: Date = new Date(), months: number = 0): Date {
        const day = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() !== day) {
            date.setDate(0);
        }
        return date;
    }

    eachEnum(srcEnum, iteratee): any[] {
        return eachEnum(srcEnum, iteratee);
    }

    eachFrom(collection, index, iteratee): any[] {
        return eachFrom(collection, index, iteratee);
    }

    /**
     * This function generates vibrant, "evenly spaced" colours (i.e. no clustering).
     * This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
     * */
    getRainbow(steps: number = 10, step: number = 0): string {
        let r, g, b;
        const h = step / steps;
        // tslint:disable-next-line:no-bitwise
        const i = ~~(h * 6);
        const f = h * 6 - i;
        const q = 1 - f;
        switch (i % 6) {
            case 0:
                r = 1, g = f, b = 0;
                break;
            case 1:
                r = q, g = 1, b = 0;
                break;
            case 2:
                r = 0, g = 1, b = f;
                break;
            case 3:
                r = 0, g = q, b = 1;
                break;
            case 4:
                r = f, g = 0, b = 1;
                break;
            case 5:
                r = 1, g = 0, b = q;
                break;
        }
        // tslint:disable-next-line:no-bitwise
        const red = ("00" + (~~(r * 255)).toString(16)).slice(-2);
        // tslint:disable-next-line:no-bitwise
        const green = ("00" + (~~(g * 255)).toString(16)).slice(-2);
        // tslint:disable-next-line:no-bitwise
        const blue = ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return ("#" + red + green + blue);
    }

    getRandomNonConsecutiveHex(phase: number = 10): string {
        const index = this._colorDb.generated.length + 1;
        const red = Math.sin(this._colorDb.frequency * index + 2 + phase) * this._colorDb.factor;
        const green = Math.sin(this._colorDb.frequency * index + phase) * this._colorDb.factor;
        const blue = Math.sin(this._colorDb.frequency * index + 4 + phase) * this._colorDb.factor;
        const result = rgb2Hex(red, green, blue);
        this._colorDb.generated.push(result);
        return result;

    }

    isNumeric(value: any): boolean {
        return !isNaN(parseInt(value, 10));
    }

    isValidLength(value: any): boolean {
        return this.isNumeric(value) && value >= 0;
    }

    logWithStyle(title: string, msg: string, color: string, content: any) {
        console.group(title || "");
        console.log("%c" + msg, `color: ${color}`, content);
        console.groupEnd();
    }

    openAlertDialog(data: XmatAlertDialogData = this._defaultAlertData): Observable<XmatAlertDialogActions> {
        const dialogConfig = new MatDialogConfig();
        _.extend(this._defaultAlertData, data);
        _.extend(dialogConfig, {
            width: this._xmatConstants.dialogOptions.defaultWidth,
            data: data,
            disableClose: true
        });
        // Open dialog and pass data plus options
        const dialogRef = this._dialog.open(XmatAlertDialogComponent, dialogConfig);

        return new Observable(observer => {
            // Catch result
            dialogRef.afterClosed().subscribe((result: XmatAlertDialogActions) => {
                observer.next(result);
                observer.complete();
            });

        });
    }

    openConfirmDialog(data: XmatConfirmDialogData,
                      disableClose?: boolean,
                      width?: string,
                      returnRef?: false): Observable<boolean>;
    openConfirmDialog(data: XmatConfirmDialogData,
                      disableClose: boolean,
                      width: string,
                      returnRef: true): MatDialogRef<XmatConfirmDialogComponent, any>;
    openConfirmDialog(data?: XmatConfirmDialogData,
                      disableClose: boolean = false,
                      width: string = this._xmatConstants.dialogOptions.defaultWidth,
                      returnRef: boolean = false): MatDialogRef<XmatConfirmDialogComponent, any> | Observable<boolean> {

        const dialogConfig = new MatDialogConfig<XmatConfirmDialogData>();
        dialogConfig.width = width;
        dialogConfig.data = <XmatConfirmDialogData>_.merge({}, this._confirmDialogDefaults, data);
        dialogConfig.disableClose = disableClose;

        // Open dialog and pass data plus options
        const dialogRef = this._dialog.open(XmatConfirmDialogComponent, dialogConfig);

        if (returnRef) {
            return dialogRef;
        }
        else {
            return new Observable(observer => {
                // Catch result
                dialogRef.afterClosed().subscribe((result: boolean) => {
                    observer.next(result);
                    observer.complete();
                });
            });
        }
    }

    showSnackBar(data: XmatSnackBarData = {message: "-", showAction: false}): MatSnackBarRef<XmatSnackBarComponent> {
        const snackBarConfig = new MatSnackBarConfig();
        const panelClassNames = ["xmat-snack"];
        if (!!data.type) {
            panelClassNames.push(data.type);
        }
        _.extend(snackBarConfig, {
            data: data,
            duration: data.duration || 5000,
            panelClass: panelClassNames
        });

        return this._snackBar.openFromComponent(XmatSnackBarComponent, snackBarConfig);
    }

}
