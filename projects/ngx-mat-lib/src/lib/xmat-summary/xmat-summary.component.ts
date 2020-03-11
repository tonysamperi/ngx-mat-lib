import { Component, Input, OnDestroy } from "@angular/core";
import { XmatSelect, XmatSummaryConfig } from "ngx-mat-lib";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
//
import { XmatBreakpointKeys } from "../xmat-models/xmat-breakpoints.model";
//
import { chunk, merge, map, forEach } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "xmat-summary",
    templateUrl: "./xmat-summary.component.html",
    styleUrls: ["./xmat-summary.component.scss"]
})
export class XmatSummaryComponent implements OnDestroy {

    @Input()
    set config(newValue: XmatSummaryConfig) {
        this._config = merge({}, this._defaults, newValue);
        if (!Array.isArray(this._config.props) || !this._config.props.length) {
            this._config.props = Object.keys(this._config.data);
        }
        this._checkColumnsConfig();
        this._buildSummary();
    }

    get config(): XmatSummaryConfig {
        return this._config;
    }

    summary: XmatSelect[][] = [];

    private _currentMqAlias: string = "lg";
    private _config: XmatSummaryConfig;
    private _defaults: XmatSummaryConfig = {
        data: {},
        printMap: {},
        labelsMap: {},
        columns: {
            [XmatBreakpointKeys.xl]: 1,
            [XmatBreakpointKeys.lg]: 1,
            [XmatBreakpointKeys.md]: 1,
            [XmatBreakpointKeys.sm]: 1,
            [XmatBreakpointKeys.xs]: 1,
        }
    };
    private _subsCtrl$: Subject<void> = new Subject<void>();

    constructor(mediaService: MediaObserver) {
        mediaService.asObservable()
            .pipe(takeUntil(this._subsCtrl$))
            .subscribe((changes: MediaChange[]) => {
                const change = changes[0];
                const previousMqAlias = this._currentMqAlias; // Clone previous state to check for columns change
                if (previousMqAlias !== change.mqAlias) {
                    this._currentMqAlias = change.mqAlias;
                    !!this._config && this._needsBuild(previousMqAlias, change.mqAlias) && this._buildSummary();
                }
            });
    }

    ngOnDestroy(): void {
        this._subsCtrl$.next();
    }

    protected _buildSummary(): void {
        const chunks = Math.ceil(this._config.props.length / (this._config.columns[this._currentMqAlias] || 1));
        // console.info(`XMAT-SUMMARY => ${chunks} CHUNKS FOR ${this._config.props.length} PROPS`);
        this.summary = Object.keys(this._config.data).length ? chunk(this._mapData(), chunks) : void 0;
    }

    protected _checkColumnsConfig(): void {
        forEach(this._config.columns, (value: number, mqAlias: string) => {
            if (typeof value !== typeof 0 || value < 1) {
                this._config.columns[mqAlias] = 1;
            }
            if (value > this._config.props.length) {
                this._config.columns[mqAlias] = Math.max(1, this._config.props.length);
            }
        });

    }

    protected _mapData(): XmatSelect[] {
        return map(this._config.props, (k: string) => {
            const value = this._config.data[k];
            return {
                value: this._config.printMap[k] ? this._config.printMap[k](value) : value,
                description: this._config.labelsMap[k] !== void 0 ? this._config.labelsMap[k] : k
            } as XmatSelect;
        });
    }

    protected _needsBuild(previousMqAlias: string, nextMqAlias): boolean {
        return this._config.columns[previousMqAlias] !== this._config.columns[nextMqAlias];
    }

}
