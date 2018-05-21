import {NativeDateAdapter} from "@angular/material";

const xmatSep = "/";
const xmatDay = "DD";
const xmatMonth = "MM";
const xmatYear = "YYYY";
const xmatCurrentYear = new Date().getFullYear();
const xmatCentury = Math.round(xmatCurrentYear / 100);

export const XMAT_LOCALE_IT = "it-IT";
export const XMAT_LOCALE_EN = "en-GB";
export const XMAT_LOCALE_FR = "fr-FR";
export const XMAT_FORMATS = {
    [XMAT_LOCALE_IT]: `${xmatDay}${xmatSep}${xmatMonth}${xmatSep}${xmatYear}`,
    [XMAT_LOCALE_EN]: `${xmatMonth}${xmatSep}${xmatDay}${xmatSep}${xmatYear}`,
    [XMAT_LOCALE_FR]: `${xmatDay}${xmatSep}${xmatMonth}${xmatSep}${xmatYear}`
};

// COPY THIS TO CUSTOMIZE CALENDAR FORMATS!!
export const XMAT_DATE_FORMATS = {
    parse: {
        dateInput: {month: "numeric", year: "numeric", day: "numeric"}
        // dateInput: xmatItFormat
    },
    display: {
        dateInput: XMAT_FORMATS[XMAT_LOCALE_IT],
        monthYearLabel: `${xmatMonth}${xmatSep}${xmatYear}`,
        dateA11yLabel: XMAT_FORMATS[XMAT_LOCALE_IT],
        monthYearA11yLabel: `${xmatMonth}${xmatSep}${xmatYear}`
    }
};

export class XmatMatDateLocale extends NativeDateAdapter {

    displayFormat: Object | string = XMAT_DATE_FORMATS.display.dateInput;

    parse(value: any): Date | null {
        console.info("DATE PARSE value", value);
        if (this.displayFormat === XMAT_DATE_FORMATS.display.dateInput) {
            if ((typeof value === typeof "") && value.length > 0) {
                const str = value.split(xmatSep);
                if (str.length < 3) {
                    return new Date("xmat");
                }
                let yearBak = str[2];
                if (str[2].length < 4) {
                    str[2] = xmatCentury + str[2];
                }
                if (str[2].length !== 4) {
                    return new Date("xmat");
                }
                const year = +str[2];
                const month = +str[1] - 1;
                const day = +str[0];

                return new Date(year, month, day);
            }
            else {
                return null;
            }
        }
        else {
            console.warn("Date input format not valid." +
                " Be sure to use XMAT_DATE_FORMATS" +
                " or extend this class with your own 'parser' and format 'methods'");
            console.info("For a complete guide visit github.com/tonysamperi/ngx-mat-lib");
            return null;
        }
    }

    format(date: Date, displayFormat: Object): string {
        this.displayFormat = displayFormat;
        if (displayFormat === XMAT_DATE_FORMATS.display.dateInput) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this._addLeadingZeroes(day) + xmatSep + this._addLeadingZeroes(month) + xmatSep + year;
        }
        else {
            let formattedDate = "";
            try {
                formattedDate = date.toLocaleDateString(XMAT_LOCALE_IT, displayFormat);
            } catch (e) {
                console.warn("Catched error while printing ", e);
                formattedDate = date.toDateString();
            }
            return formattedDate;
        }
    }

    private _addLeadingZeroes(n: number) {
        return ("0" + n).slice(-2);
    }
}
