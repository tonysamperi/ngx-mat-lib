import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {XmatConfirmDialogComponent} from "../xmat-dialog/ts/xmat-confirm-dialog.component";
import {XmatConstantsService} from "./xmat-constants.service";
import {XmatSnackBarComponent} from "../xmat-snack-bar/ts/xmat-snack-bar.component";
import {XmatSnackBarData} from "../xmat-snack-bar/ts/xmat-snack-bar-data.model";
import * as _ from "lodash";

const colorParams = {
    center: 128,
    diversity: 10,
    width: 127
};

const hexValues: string = "0123456789ABCDEF";

const byte2Hex = (n) => {
    return String(hexValues.substr((n >> 4) & 0x0F, 1)) + hexValues.substr(n & 0x0F, 1);
};

const rgb2Hex = (r, g, b) => {
    return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
};

const eachFrom = (array, index, iteratee) => {
    let _index = index == null ? -1 : index, length = array == null ? 0 : array.length;

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

    constructor(protected _dialog: MatDialog,
                protected  _snackBar: MatSnackBar,
                protected _xmatConstants: XmatConstantsService) {

    }

    /**
     * PUBLIC FUNCTIONS
     */
    addLeadingZeroes(n: number) {
        return ("00" + n).slice(-2);
    }

    createReflectionModel(source, level = 0): any {
        // For both arrays and objects
        if (!!source && typeof source === typeof {}) {
            let target = {};
            if (Array.isArray(source)) {
                target = [];
            }
            let sourceKeys = Object.keys(source);
            for (let i = 0; i < sourceKeys.length; i++) {
                let key = sourceKeys[i];
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
            console.info("Cannot create reflection of non object");
            return void 0;
        }
    }

    dateAddMonths(date: Date = new Date(), months: number = 0): Date {
        let day = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() !== day) {
            date.setDate(0);
        }
        return date;
    }

    eachFrom(collection, index, iteratee) {
        return eachFrom(collection, index, iteratee);
    }

    /**
     * This function generates vibrant, "evenly spaced" colours (i.e. no clustering).
     * This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
     * */
    getRainbow(steps: number = 10, step: number = 0) {
        let r, g, b;
        let h = step / steps;
        let i = ~~(h * 6);
        let f = h * 6 - i;
        let q = 1 - f;
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
        let red = ("00" + (~~(r * 255)).toString(16)).slice(-2);
        let green = ("00" + (~~(g * 255)).toString(16)).slice(-2);
        let blue = ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return ("#" + red + green + blue);
    }

    getRandomNonConsecutiveHex(phase: number = 10) {
        let index = this._colorDb.generated.length + 1;
        let red = Math.sin(this._colorDb.frequency * index + 2 + phase) * this._colorDb.factor;
        let green = Math.sin(this._colorDb.frequency * index + phase) * this._colorDb.factor;
        let blue = Math.sin(this._colorDb.frequency * index + 4 + phase) * this._colorDb.factor;
        let result = rgb2Hex(red, green, blue);
        this._colorDb.generated.push(result);
        return result;

    }

    isNumeric(value: any): boolean {
        return !isNaN(parseInt(value, 10));
    }

    isValidLength(value: any): boolean {
        return this.isNumeric(value) && value >= 0;
    }

    openConfirmDialog(data = {}, disableClose: boolean = false): Observable<boolean> {
        let dialogConfig = new MatDialogConfig();
        _.extend(dialogConfig, {
            width: this._xmatConstants.dialogOptions.defaultWidth,
            data: data,
            disableClose: disableClose
        });
        // Open dialog and pass data plus options
        let dialogRef = this._dialog.open(XmatConfirmDialogComponent, dialogConfig);

        return new Observable(observer => {
            // Catch result
            dialogRef.afterClosed().subscribe(result => {
                observer.next(result);
                observer.complete();
            });

        });
    }

    showSnackBar(data: XmatSnackBarData = {message: "-", showAction: false}): MatSnackBarRef<XmatSnackBarComponent> {

        let snackBarConfig = new MatSnackBarConfig();

        _.extend(snackBarConfig, {
            data: data,
            duration: 5000
        });

        return this._snackBar.openFromComponent(XmatSnackBarComponent, snackBarConfig);
    }

}
