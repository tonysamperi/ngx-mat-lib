import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {FocusMonitor} from "@angular/cdk/a11y";
import {
    FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
    Validators
} from "@angular/forms";
import {Component, ElementRef, forwardRef, Input, OnDestroy, AfterViewInit, ViewEncapsulation} from "@angular/core";
import {MatFormFieldControl} from "@angular/material";
import {Subject} from "rxjs";
import {XmatTime} from "../../xmat-models/index";
import {xmatTimeInputValidation} from "../../xmat-validators/xmat-time-input.validator";

const controlType = "xmat-time-input";
const elementType = "input";

const hoursPattern = new RegExp("^([01][0-9]|2[0-3])");
const minutesPattern = new RegExp("^([0-5][0-9])$");

//noinspection JSAnnotator
@Component({
    selector: controlType,
    templateUrl: "../tpl/xmat-time-input.component.html",
    styleUrls: ["../scss/xmat-time-input.component.scss"],
    providers: [
        {provide: MatFormFieldControl, useExisting: XmatMatTimeInputComponent},
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XmatMatTimeInputComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => XmatMatTimeInputComponent), multi: true}
    ],
    host: {
        "[class.xmat-mat-time-input]": "true",
        "[class.floating]": "shouldLabelFloat",
        "[class.filled]": "isFilled",
        "[id]": "id",
        "[attr.aria-describedby]": "describedBy",
    },
    encapsulation: ViewEncapsulation.None
})

export class XmatMatTimeInputComponent implements MatFormFieldControl<XmatTime>, AfterViewInit, OnDestroy {

    get empty() {
        const value = this.parts.value;
        return !value.hours && !value.minutes;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    get isFilled() {
        const value = this.parts.value;
        return value.hours.length + value.minutes.length === 4;
    }

    @Input()
    get placeholder() {
        return this.inputPlaceholder;
    }

    set placeholder(value) {
        const splitPlaceholder = value.split(":");
        this.inputPlaceholder = value;
        this.placeholderH = splitPlaceholder[0] || "";
        this.placeholderM = splitPlaceholder[1] || "";
        this.stateChanges.next();
    }

    @Input()
    get required() {
        return this._required;
    }

    set required(req) {
        this._required = coerceBooleanProperty(req);
        this._updateValidators();
        // Emit stateChange to update value in mat-groupCtrl-field
        this.stateChanges.next();
    }

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(dis) {
        this._disabled = coerceBooleanProperty(dis);
        this._disabled ? this.parts.disable() : this.parts.enable();
        this._updateValidators();
        // Emit stateChange to update value in mat-groupCtrl-field
        this.stateChanges.next();
    }

    @Input()
    get value(): XmatTime | null {
        const newValue = this.parts.value;
        if (newValue.hours.length === 2 && newValue.minutes.length === 2) {
            return new XmatTime(newValue.hours, newValue.minutes);
        }
        return null;
    }

    set value(time: XmatTime | null) {
        time = time || new XmatTime("", "");
        this.parts.setValue({hours: time.hours, minutes: time.minutes});
        this.stateChanges.next();
    }

    static nextId = 0;
    private _deniedChars = /[^0-9]+/;
    private _$matFormField = null;
    private _required: boolean = false;
    private _disabled: boolean = false;
    private _validators = {
        hours: [Validators.minLength(2), Validators.maxLength(2), Validators.pattern(hoursPattern)],
        minutes: [Validators.minLength(2), Validators.maxLength(2), Validators.pattern(minutesPattern)],
    };


    controlType: string = controlType;
    describedBy = "";

    errorState = false;
    focused = false;
    id = `${controlType}-${XmatMatTimeInputComponent.nextId++}`;
    inputPlaceholder: string;
    invalid: boolean = false;
    model: XmatTime = new XmatTime();
    ngControl = null;
    parts: FormGroup;
    placeholderM: string = "";
    placeholderH: string = "";
    stateChanges = new Subject<void>();

    constructor(private _formBuilder: FormBuilder,
                private _focusMonitor: FocusMonitor,
                private _elRef: ElementRef) {

        this.parts = _formBuilder.group({
            "hours": ["", Validators.pattern(hoursPattern)],
            "minutes": ["", Validators.pattern(minutesPattern)],
        }, {validator: xmatTimeInputValidation});

        _focusMonitor.monitor(_elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });

    }

    inputChange(event: any): void {
        this._handlePropagation();
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elRef.nativeElement);
    }

    ngAfterViewInit(): void {
        const xmatInput = this._elRef.nativeElement;
        const container = xmatInput.closest("mat-form-field");
        const isContainerValid = !!container && container.classList.contains("mat-form-field-type-xmat-time-input");
        if (isContainerValid && container.contains(xmatInput)) {
            this._$matFormField = container;
        }
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== elementType) {
            this._elRef.nativeElement.querySelector(elementType).focus();
        }
    }

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(" ");
    }

    // registers "fn" that will be fired when changes are made
    // this is how we emit the changes back to the groupCtrl
    registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    // not used, used for touch input
    registerOnTouched() {
    }

    setTouched(): void {
        this.parts.markAsTouched();
        this.validate(this.parts);
        // Updates errorState to show mat-error
        // this.errorState = this.parts.invalid;
        // Emit stateChange to update value in mat-groupCtrl-field
        this.stateChanges.next();

    }

    typingValidation(event: any, isHours: boolean = false): boolean {
        let keyCode, inputChar;
        if (event.key === void 0) {
            keyCode = event.keyCode || event.charCode;
            inputChar = String.fromCharCode(keyCode);
        } else {
            inputChar = event.key;
            if (inputChar.indexOf('Arrow') > -1) {
                return true;
            }
            switch (inputChar) {
                case "Delete":
                case "Backspace":
                case "Enter":
                case "Tab":
                case "Left":
                case "Right":
                case "F5":
                    return true;
                case "Insert":		// Shift + INS
                    if (event.shiftKey) {
                        return true;
                    }
                    break;
                case "X":			// Ctrl + X / Cmd + x
                case "x":
                case "C":			// Ctrl + C / Cmd + c
                case "c":
                case "V":			// Ctrl + V / Cmd + V
                case "v":			// Ctrl + v / Cmd + v
                    if (event.ctrlKey || event.metaKey) {
                        return true;
                    }
                    break;
            }
        }

        if (String(inputChar).match(this._deniedChars)) {
            event.preventDefault();
            return false;
        }

        // TODO: HANDLE THE COOL WAY
        /*if (isHours && this.parts.value.hours.length === 2) {
         this._elRef.nativeElement.querySelectorAll(elementType)[1].focus();
         }*/

    }

    validate(c: FormControl | FormGroup): ValidationErrors | null {
        if (!!this._$matFormField) {
            this.invalid = this.parts.invalid && this.parts.touched;
            this._$matFormField.classList.toggle("mat-form-field-invalid", this.invalid);
        }
        const value = this.parts.value;
        const charsCount = value.hours.length + value.minutes.length;
        const addFormatError = this.parts.invalid && (charsCount > 0 || charsCount < 4);

        return addFormatError ? {timeFormatError: true} : null;
    }

    // this is the initial value and reset are updated to the component
    writeValue(value: XmatTime): void {
        this.parts.reset();
        let newValue = {hours: "", minutes: ""} as XmatTime;
        if (!!value && value instanceof XmatTime) {
            newValue = value;
        }
        this.parts.setValue(newValue);
        this._handlePropagation();
    }

    // Private methods
    private _handlePropagation(): void {
        let toPropagate = void 0;
        if (this.parts.valid) {
            const value = this.parts.value;
            if (!value.hours && !value.minutes) {
                toPropagate = void 0;
            }
            else {
                toPropagate = new XmatTime(value.hours, value.minutes);
            }
        }
        this._propagateChange(toPropagate);
        // Emit stateChange to update value in mat-groupCtrl-field
        this.stateChanges.next();
    }

    // the method set in registerOnChange to emit changes back to the groupCtrl
    private _propagateChange(_: any) {
    }

    // If disable or required change, updates validation rules
    private _updateValidators(): void {
        const hoursCtrl = this.parts.get("hours");
        const minsCtrl = this.parts.get("minutes");
        if (this._disabled) {
            hoursCtrl.setValidators([]);
            minsCtrl.setValidators([]);
        }
        else {
            if (this._required) {
                hoursCtrl.setValidators([Validators.required].concat(this._validators.hours));
                minsCtrl.setValidators([Validators.required].concat(this._validators.minutes));
            } else {
                hoursCtrl.setValidators(this._validators.hours);
                minsCtrl.setValidators(this._validators.minutes);
            }
        }
    }


}
