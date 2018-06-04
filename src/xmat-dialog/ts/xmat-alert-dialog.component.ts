import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import * as _ from "lodash";

export interface XmatAlertDialogData {
    type: XmatAlertTypes;
    title?: string;
    cancelText?: string;
    confirmText?: string;
    hideConfirmButton?: boolean;
    hideCancelButton?: boolean;
    showCloseButton?: boolean;
    dialogContent?: string | HTMLElement;
}

export enum XmatAlertTypes {
    success,
    error,
    question,
    info,
    warning
}

export enum XmatAlertDialogActions {
    confirm,
    cancel,
    close
}

const bgColorKeyKebab: string = "background-color";
const bgColorKeyCamel: string = "backgroundColor";
const dash: string = "-";
const typePlaceHolder: string = "%type%";
const classNamePre: string = "swal2";
const classNameAnimate: string = [classNamePre, "animate", typePlaceHolder, "icon"].join(dash);
const classNameJustifyCenter: string = "xmat-justify-center";
const classNameJustifyBetween: string = "xmat-justify-between";

/**
 * TODO: check in ngx-popper how to pass tplRef content
 */

@Component({
    selector: "xmat-message-dialog",
    templateUrl: "../tpl/xmat-alert-dialog.component.html",
    styleUrls: ["../scss/xmat-alert-dialog.component.scss"]
})
export class XmatAlertDialogComponent implements OnInit, AfterViewInit {

    @ViewChild("xmatAlertPrimary") xmatBtnPrimary;
    @Input("confirmStyles") private _confirmStyles: Object;
    @Input("cancelStyles") private _cancelStyles: Object;

    md: any = {
        actions: XmatAlertDialogActions,
        actionsCtClassNames: classNameJustifyCenter,
        iconClassNames: "",
        types: XmatAlertTypes,
        inner: {
            [XmatAlertTypes[XmatAlertTypes.success]]: "",
            [XmatAlertTypes[XmatAlertTypes.error]]: "",
            [XmatAlertTypes[XmatAlertTypes.warning]]: "!",
            [XmatAlertTypes[XmatAlertTypes.question]]: "?",
            [XmatAlertTypes[XmatAlertTypes.info]]: "i",
        },
        type: "",
        styles: {
            cancel: {},
            confirm: {}
        }
    };

    /**
     * TODO: add dynamic template binding, that would be really cool and reusable
     */
    constructor(private _dialogRef: MatDialogRef<XmatAlertDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void {

        if (this.data.type !== 0 && !this.data.type) {
            this.data.type = XmatAlertTypes.info;
        }
        if (!this.data.hideCancelButton && !this.data.hideConfirmButton) {
            this.md.actionsCtClassNames = classNameJustifyBetween;
        }
        this.md.type = XmatAlertTypes[this.data.type];
        this.md.iconClassNames = [
            [classNamePre, this.md.type].join(dash),
            classNameAnimate.replace(typePlaceHolder, this.md.type)
        ];
    }

    ngAfterViewInit(): void {
        // Apply primary bg if color is not set
        if (!!this._confirmStyles) {
            _.merge(this.md.styles.confirm, this._confirmStyles);
        }
        const hasDefaultColor = !!this.md.styles.confirm[bgColorKeyKebab] || !!this.md.styles.confirm[bgColorKeyCamel];

        if (!hasDefaultColor && !!this.xmatBtnPrimary) {
            const xmatBtnPrimaryComStyle = window.getComputedStyle(this.xmatBtnPrimary._elementRef.nativeElement);
            this.md.styles.confirm[bgColorKeyKebab] = xmatBtnPrimaryComStyle.getPropertyValue(bgColorKeyKebab);
            this.md.styles.confirm.color = xmatBtnPrimaryComStyle.getPropertyValue("color"); // Nuke whatever color and set ThemePalette's
        }

        if (!!this._cancelStyles) {
            _.merge(this.md.styles.cancel, this._cancelStyles);
        }
    }


    onActionClick(action: XmatAlertDialogActions): void {
        this._dialogRef.close(action);
    }
}
