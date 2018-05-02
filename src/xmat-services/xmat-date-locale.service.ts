import {NativeDateAdapter} from "@angular/material";

const defaultSeparator = "/";
const defaultLocale = "it-IT";

export const MAT_DATE_CUSTOM_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
};

export class XmatMatDateLocale extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat == MAT_DATE_CUSTOM_FORMATS.display.dateInput) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this.addLeadingZeroes(day) + defaultSeparator + this.addLeadingZeroes(month) + defaultSeparator + year;
        } else {
            let formattedDate = "";
            try {
                formattedDate = date.toLocaleDateString(defaultLocale, displayFormat);
            } catch (e) {
                console.warn("Catched error while printing ", e);
                formattedDate = date.toDateString()
            }
            return formattedDate;
        }
    }

    private addLeadingZeroes(n: number) {
        return ("00" + n).slice(-2);
    }
}