

export class XmatTime {

    //private hoursValidationPattern = new RegExp("^([01]\\d?|2[0-3])");
    //private minutesValidationPattern = new RegExp("^([0-5]\\d)$");

    constructor(public hours: string = "", public minutes: string = "") {
    }

    getFullTime(sep: string = ":") {
        //if (this.isTimeValid()) {
            return this.hours + sep + this.minutes;
        //}
    }

    getHours(): number {
        return parseInt(this.hours);
    }

    getMinutes(): number {
        return parseInt(this.minutes);
    }

    //Private methods
    /*isTimeValid() {
        return this.hoursValidationPattern.test(this.hours) && this.minutesValidationPattern.test(this.minutes);
    }*/
}