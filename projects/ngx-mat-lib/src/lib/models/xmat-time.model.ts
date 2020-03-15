export const xmatTimeSeparator: string = ":";

export const xmatDoubleO: string = "00";

export class XmatTime {

    hours: string;
    minutes: string;

    constructor(hours: string | number = xmatDoubleO, minutes: string | number = xmatDoubleO) {
        !isNaN(+hours) || (hours = xmatDoubleO);
        !isNaN(+minutes) || (minutes = xmatDoubleO);
        this.hours = this._addLeadingZeroes(hours);
        this.minutes = this._addLeadingZeroes(minutes);
    }

    getFullTime(sep = xmatTimeSeparator): string {
        return [this.hours, this.minutes].join(sep);
    }

    getHours(): number {
        return +this.hours;
    }

    getMinutes(): number {
        return +this.minutes;
    }

    // Private methods

    private _addLeadingZeroes(n: number | string) {
        return (xmatDoubleO + n).slice(-2);
    }

}
