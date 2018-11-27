export const xmatTimeSeparator: string = ":";

export const xmatDoubleO: string = "00";

export type XmatTimeUnitFormat = "number" | "string";

export class XmatTime {

    hours: string;
    minutes: string;

    constructor(hours: string | number = xmatDoubleO, minutes: string | number = xmatDoubleO) {
        !isNaN(+hours) || (hours = xmatDoubleO);
        !isNaN(+minutes) || (minutes = xmatDoubleO);
        this.hours = this._addLeadingZeroes(hours);
        this.minutes = this._addLeadingZeroes(minutes);
    }

    getFullTime(sep = xmatTimeSeparator) {
        return [this.hours, this.minutes].join(sep);
    }

    getHours(format: XmatTimeUnitFormat = "number"): number | string {
        if (format === "string") {
            return this.hours;
        }
        if (format === "number") {
            return +this.hours;
        }
        console.error("XmatTime: invalid format provided. Please choose a valid XmatTimeUnitFormat");
    }

    getMinutes(format: XmatTimeUnitFormat = "number"): number | string {
        if (format === "string") {
            return this.minutes;
        }
        if (format === "number") {
            return +this.minutes;
        }
        console.error("XmatTime: invalid format provided. Please choose a valid XmatTimeUnitFormat");
    }

    // Private methods

    private _addLeadingZeroes(n: number | string) {
        return (xmatDoubleO + n).slice(-2);
    }

}
