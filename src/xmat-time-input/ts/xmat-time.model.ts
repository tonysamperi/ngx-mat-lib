export class XmatTime {

    // private hoursValidationPattern = new RegExp("^([01]\\d?|2[0-3])");
    // private minutesValidationPattern = new RegExp("^([0-5]\\d)$");

    constructor(public hours = "00", public minutes = "00") {
    }

    getFullTime(sep = ":") {

        // if (this.isTimeValid()) {
        return this.hours + sep + this.minutes;
        // }
    }

    getHours(): number {
        return parseInt(this.hours, 10);
    }

    getMinutes(): number {
        return parseInt(this.minutes, 10);
    }

    // Private methods
    /*
     isTimeValid() {
     return this.hoursValidationPattern.test(this.hours) && this.minutesValidationPattern.test(this.minutes);
     }
     */
}
