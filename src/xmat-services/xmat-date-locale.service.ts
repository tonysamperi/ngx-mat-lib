import {NativeDateAdapter} from "@angular/material";

const xmatSep = "/";
const xmatDay = "DD";
const xmatMonth = "MM";
const xmatYear = "YYYY";
const defaultLocale = "it-IT";
const xmatItFormat = `${xmatDay}${xmatSep}${xmatMonth}${xmatSep}${xmatYear}`;
export const MAT_DATE_CUSTOM_FORMATS = {
    parse: {
        // dateInput: {month: "short", year: "numeric", day: "numeric"}
        dateInput: xmatItFormat
    },
    display: {
        // dateInput: { month: "short", year: "numeric", day: "numeric" },
        dateInput: xmatItFormat,
        // monthYearLabel: {year: "numeric", month: "short"},
        // dateA11yLabel: {year: "numeric", month: "long", day: "numeric"},
        // monthYearA11yLabel: {year: "numeric", month: "long"},
        monthYearLabel: `${xmatMonth}${xmatSep}${xmatYear}`,
        dateA11yLabel: xmatItFormat,
        monthYearA11yLabel: `${xmatMonth}${xmatSep}${xmatYear}`
    }
};

export class XmatMatDateLocale extends NativeDateAdapter {

    parse(value: any): Date | null {

        if ((typeof value === typeof "") && (value.indexOf(xmatSep) > -1)) {
            const str = value.split(xmatSep);

            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);

            return new Date(year, month, date);
        }
        const timestamp = typeof value === typeof 0 ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    format(date: Date, displayFormat: Object): string {
        if (displayFormat === MAT_DATE_CUSTOM_FORMATS.display.dateInput) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this.addLeadingZeroes(day) + xmatSep + this.addLeadingZeroes(month) + xmatSep + year;
        } else {
            let formattedDate = "";
            try {
                formattedDate = date.toLocaleDateString(defaultLocale, displayFormat);
            } catch (e) {
                console.warn("Catched error while printing ", e);
                formattedDate = date.toDateString();
            }
            return formattedDate;
        }
    }

    private addLeadingZeroes(n: number) {
        return ("00" + n).slice(-2);
    }
}
