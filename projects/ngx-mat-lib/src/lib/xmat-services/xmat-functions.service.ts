import { Injectable } from "@angular/core";
import { ParamMap, Params, convertToParamMap } from "@angular/router";
import {
    MatDialog,
    MatDialogConfig,
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarRef,
    MatDialogRef
} from "@angular/material";
//
import {
    XmatConfirmDialogComponent,
    XmatAlertDialogComponent
} from "../xmat-dialog/index";
import {
    XmatAlertDialogData,
    XmatAlertTypes,
    XmatAlertDialogActions,
    XmatConfirmDialogData,
    XmatSnackBarData,
    XmatFileReaderEvent,
    XmatGenericObject,
    XmatSnackBarDataTypes,
    XmatSelect
} from "../xmat-models/index";
import { XmatConstantsService, XMAT_CONSTANT_LABELS } from "./xmat-constants.service";
import { XmatSnackBarComponent } from "../xmat-snack-bar/index";
//
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { each, includes, extend } from "lodash";
import { parseZone as moment } from "moment";

type XmatObservablesMap = XmatGenericObject<Observable<any>>;

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
    each(srcEnum, (key) => {
        // Continue if key is not a number
        if (typeof srcEnum[key] !== typeof 0) {
            return true;
        }
        target.push(srcEnum[key]);
    });
    return each(target, iteratee);
};

/**
 * THIS SERVICE REQUIRES 3 DEPENDENCIES:
 * XmatConstantsService, XmatSnackBarModule and XmatDialogModule
 */
@Injectable()
export class XmatFunctionsService {

    protected _confirmDialogDefaults: XmatConfirmDialogData = {
        confirmText: XMAT_CONSTANT_LABELS.confirm,
        cancelText: XMAT_CONSTANT_LABELS.cancel,
        dialogContent: XMAT_CONSTANT_LABELS.proceed,
        hideCancelButton: false,
        confirmColor: "warn",
        title: XMAT_CONSTANT_LABELS.warningTitle
    };

    private _colorDb = {
        factor: colorParams.width + colorParams.center,
        frequency: Math.PI * 2 / colorParams.diversity,
        generated: []
    };

    private _defaultAlertData: XmatAlertDialogData = {
        type: XmatAlertTypes.warning,
        title: XMAT_CONSTANT_LABELS.warningTitle,
        confirmText: XMAT_CONSTANT_LABELS.confirm,
        cancelText: XMAT_CONSTANT_LABELS.cancel
    };

    constructor(protected _dialog: MatDialog,
        protected _snackBar: MatSnackBar,
        protected _xmatConstants: XmatConstantsService) {
    }

    /**
     * PUBLIC FUNCTIONS
     */
    addLeadingZeroes(n: number | string): string {
        return ("0" + n).slice(-2);
    }

    createReflectionModel(source, level = 0): any {
        // For both arrays and objects
        if (!!source && typeof source === typeof {}) {
            const target = Array.isArray(source) ? [] : {};
            const sourceKeys = Object.keys(source); // new Object();
            for (let i = 0; i < sourceKeys.length; i++) {
                const key = sourceKeys[i];
                // Always create new key on the target, it will eventually be converted to object
                // For both arrays and objects
                return target[key] = this.createReflectionModel(source[key], level + 1);
            }
            return target;
        }
        else {
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

    eachFrom<T = any>(array: T[], index: number, iteratee: (item: T, index: number, source: T[]) => any): T[] {
        if (!Array.isArray(array)) {
            console.error(`eachFrom only accept arrays as source, found instead ${typeof array}`);
            return array;
        }
        // tslint:disable-next-line:naming-convention
        let _index = index == null ? -1 : index;
        const length = array == null ? 0 : array.length;

        while (++_index < length) {
            if (iteratee(array[_index], _index, array) === false) {
                break;
            }
        }
        return array;
    }

    extractQueryParams(queryString = location.search): ParamMap {
        const query: Params = {};
        const pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
        each(pairs, pair => {
            const key = decodeURIComponent(pair.split("=")[0]);
            if (!!key) {
                query[key] = decodeURIComponent(pair.split("=")[1] || "");
            }
        });
        return convertToParamMap(query);
    }

    filterProps(original: XmatGenericObject, exclude: string[] = []): XmatGenericObject {
        if (original !== Object(original)) {
            console.error("TidUtils => Argument was not valid object", original);
            return;
        }

        if (Array.isArray(exclude) && exclude.length) {
            return Object.keys(original).reduce((obj, key) => {
                if (!includes(exclude, key)) {
                    obj[key] = original[key];
                }

                return obj;
            }, {});
        }

        return original;
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

    /**
     *
     * @param source the source object
     * @param keys allows to order the result and/or include only certain props
     */
    objectToArray<T = any>(source: XmatGenericObject<any>, keys = Object.keys(source), keepVoid: boolean = !1): XmatSelect<T>[] {
        const result = [];
        each(keys, (k) => {
            source[k] !== void 0 &&
                result.push({
                    description: k,
                    value: source[k]
                });
        });
        return result;
    }

    openAlertDialog(data: XmatAlertDialogData,
        returnRef?: false): Observable<XmatAlertDialogActions>;
    openAlertDialog(data: XmatAlertDialogData,
        returnRef: true): MatDialogRef<XmatAlertDialogComponent, XmatAlertDialogActions>;
    openAlertDialog(data: XmatAlertDialogData = this._defaultAlertData,
        // tslint:disable-next-line:max-line-length
        returnRef: boolean = false): Observable<XmatAlertDialogActions> | MatDialogRef<XmatAlertDialogComponent, XmatAlertDialogActions> {
        data = extend({}, this._defaultAlertData, data);
        const dialogConfig = new MatDialogConfig<XmatAlertDialogData>();
        extend(dialogConfig, {
            id: data.dialogId,
            width: this._xmatConstants.dialogOptions.defaultWidth,
            data: data,
            disableClose: true
        });
        // Open dialog and pass data plus options
        const dialogRef = this._dialog.open(XmatAlertDialogComponent, dialogConfig);
        if (returnRef) {
            return dialogRef;
        }
        else {
            return new Observable(observer => {
                // Catch result
                dialogRef.afterClosed().subscribe((result: XmatAlertDialogActions) => {
                    observer.next(result);
                    observer.complete();
                });

            });
        }
    }

    openConfirmDialog(data: XmatConfirmDialogData,
        disableClose?: boolean,
        width?: string,
        returnRef?: false): Observable<boolean>;
    openConfirmDialog(data: XmatConfirmDialogData,
        disableClose: boolean,
        width: string,
        returnRef: true): MatDialogRef<XmatConfirmDialogComponent, boolean>;
    openConfirmDialog(data?: XmatConfirmDialogData,
        disableClose: boolean = false,
        width: string = this._xmatConstants.dialogOptions.defaultWidth,
        // tslint:disable-next-line:max-line-length
        returnRef: boolean = false): MatDialogRef<XmatConfirmDialogComponent, boolean> | Observable<boolean> {

        const dialogConfig = new MatDialogConfig<XmatConfirmDialogData>();
        extend(dialogConfig, {
            id: data.dialogId,
            width: width,
            data: {
                ...this._confirmDialogDefaults,
                ...data
            } as XmatConfirmDialogData,
            disableClose: disableClose
        });

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

    parseDate(value: string | number): Date {
        if (!value) {
            return void 0;
        }
        const momentDate = moment(value);
        if (!momentDate.isValid()) {
            return this._parseDateFallback(value);
        }
        return moment(momentDate).toDate();
    }


    readAsUrl(source: Blob | File): Observable<XmatFileReaderEvent> {
        return new Observable<XmatFileReaderEvent>(observer => {
            const reader: FileReader = new FileReader();
            reader.onload = (event: XmatFileReaderEvent) => {
                observer.next(event);
                observer.complete();
            };
            reader.onerror = reader.onabort = () => {
                observer.error(!1);
            };
            reader.readAsDataURL(source);
        });
    }

    replaceAll(haystack: string, mapObj: XmatGenericObject<string>): string {
        const regExp = new RegExp(Object.keys(mapObj).join("|"), "gi");

        return haystack.replace(regExp, function (matched) {
            return mapObj[matched.toLowerCase()];
        });
    }

    showSnackBar(data: XmatSnackBarData = { message: "-", showAction: false }): MatSnackBarRef<XmatSnackBarComponent> {

        return this._snackBar.openFromComponent(XmatSnackBarComponent, extend(new MatSnackBarConfig(), {
            data: data,
            duration: data.duration || 5000,
            panelClass: ["xmat-snack", data.type]
        }));
    }

    /**
     * Shortcut to open an XmatAlertDialog passing only an error message
     * @param msg
     */
    showErrorSnackBar(msg: string = this._xmatConstants.labels.genericError, duration: number = 5000): MatSnackBarRef<XmatSnackBarComponent> {

        return this.showSnackBar({
            showAction: !1,
            message: msg,
            duration: duration,
            type: XmatSnackBarDataTypes.fail
        });
    }

    /**
     * Shortcut to open an XmatAlertDialog passing only an error message
     * @param msg
     */
    showErrorAlert(msg: string | HTMLElement = this._xmatConstants.labels.genericError): Observable<XmatAlertDialogActions> {
        return this.openAlertDialog({
            type: XmatAlertTypes.error,
            title: this._xmatConstants.labels.errorTitle,
            dialogContent: msg,
            hideCancelButton: !0,
            hideConfirmButton: !1,
            confirmText: this._xmatConstants.labels.close
        } as XmatAlertDialogData);
    }

    /**
     * Returns a formatted string using the first argument as a printf-like format.
     *
     * The first argument is a string that contains zero or more placeholders.
     * Each placeholder is replaced with the converted value from its corresponding argument.
     *
     * Supported placeholders are:
     *
     * %s - String.
     * %d - Number (both integer and float).
     * %% - single percent sign ('%'). This does not consume an argument.
     */
    sprintf(...args): string {
        let index = 1;
        return (args[0] + "").replace(/%((\d)\$)?([sd%])/g, function (match, _group_, pos, _format_) {
            if (match === "%%") {
                return "%";
            }
            if (typeof pos === "undefined") {
                pos = index++;
            }
            if (pos in args && pos > 0) {
                return args[pos];
            }
            else {
                return match;
            }
        });
    }

    stripEmojis(str: string): string {
        return str.replace(new RegExp(this._xmatConstants.regExps.emojis, "g"), "");
    }

    stripSpecialChars(str: string): string {
        return str.replace(new RegExp(this._xmatConstants.regExps.specialChars, "g"), "");
    }

    $qMap<T extends XmatGenericObject<any> = XmatGenericObject<any>>(source: XmatObservablesMap): Observable<T> {
        const queue: Observable<any>[] = [];
        const queueKeys: Array<number | string> = [];
        each(source, (o: any, key: string | number) => {
            queue.push(o);
            queueKeys.push(key);
        });
        return forkJoin(queue)
            .pipe(map((raw: any[]) => {
                const mapped = {};
                each(raw, (value, index) => {
                    mapped[queueKeys[index]] = value;
                });

                return mapped as T;
            }));
    }

    $qArray<T = any>(source: Observable<T>[]): Observable<T[]> {
        const queue: Observable<T>[] = [];
        each(source, (o: Observable<T>) => {
            queue.push(o);
        });

        return forkJoin(queue);
    }

    // Private

    private _parseDateFallback(value: string | number) {
        if (typeof value === typeof 0 || !isNaN(+value)) {
            return new Date(+value);
        }
        else {
            return new Date(<string>value);
        }
    }

}
