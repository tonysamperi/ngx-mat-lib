// tslint:disable
/*
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    NgZone,
    ViewChild,
    Input,
    Optional,
    OnDestroy,
    AfterContentChecked,
    ContentChildren,
    QueryList,
    forwardRef,
    AfterContentInit,
    Directive,
    Inject,
    Attribute,
} from "@angular/core";
import {Directionality} from "@angular/cdk/bidi";
import {ViewportRuler} from "@angular/cdk/overlay";
import {FocusMonitor} from "@angular/cdk/a11y";
import {Platform} from "@angular/cdk/platform";
import {
    ThemePalette,
    CanColor,
    CanDisableRipple,
    CanDisableRippleCtor,
    mixinDisableRipple,
    CanColorCtor,
    mixinColor,
    RippleTarget,
    CanDisable,
    HasTabIndex,
    RippleGlobalOptions,
    MAT_RIPPLE_GLOBAL_OPTIONS,
    RippleConfig,
    RippleRenderer,
    mixinTabIndex,
    CanDisableCtor,
    mixinDisabled,
    HasTabIndexCtor,
} from "@angular/material/core";
//
import {XmatInkBarDirective} from "./xmat-ink-bar.directive";
//
import {merge, Subject, of as observableOf} from "rxjs";
import {takeUntil} from "rxjs/operators";

export class XmatTabLinkBase {
}

// tslint:disable-next-line:naming-convention
export const _XmatTabLinkMixinBase:
    HasTabIndexCtor & CanDisableRippleCtor & CanDisableCtor & typeof XmatTabLinkBase =
    mixinTabIndex(mixinDisableRipple(mixinDisabled(XmatTabLinkBase)));

// Link inside of a `mat-tab-nav-bar`
@Directive({
    selector: "[xmat-tab-link], [xmatTabLink]",
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ["disabled", "disableRipple", "tabIndex"],
    host: {
        "class": "mat-tab-link",
        "[attr.aria-current]": "active",
        "[attr.aria-disabled]": "disabled.toString()",
        "[attr.tabIndex]": "tabIndex",
        "[class.mat-tab-disabled]": "disabled",
        "[class.mat-tab-label-active]": "active",
    }
})
export class XmatTabLinkDirective extends _XmatTabLinkMixinBase
    implements OnDestroy, CanDisable, CanDisableRipple, HasTabIndex, RippleTarget {

    // Whether the link is active.
    @Input()
    get active(): boolean {
        return this._isActive;
    }

    set active(value: boolean) {
        if (value !== this._isActive) {
            this._isActive = value;
            this._tabNavBar.updateActiveLink(this._elementRef);
        }
    }

    // Whether ripples are disabled on interaction.

    get rippleDisabled(): boolean {
        return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
            !!this.rippleConfig.disabled;
    }

    constructor(private _tabNavBar: XmatTabNavComponent,
                public _elementRef: ElementRef,
                ngZone: NgZone,
                platform: Platform,
                @Optional() @Inject(MAT_RIPPLE_GLOBAL_OPTIONS)
                    globalRippleOptions: RippleGlobalOptions | null,
                @Attribute("tabindex") tabIndex: string,
                private _focusMonitor?: FocusMonitor) {
        super();

        this._tabLinkRipple = new RippleRenderer(this, ngZone, _elementRef, platform);
        this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        this.rippleConfig = globalRippleOptions || {};

        // tslint:disable-next-line:radix
        this.tabIndex = parseInt(tabIndex) || 0;

        if (_focusMonitor) {
            _focusMonitor.monitor(_elementRef);
        }
    }

    rippleConfig: RippleConfig & RippleGlobalOptions;

    // Whether the tab link is active or not.
    protected _isActive: boolean = false;

    // Reference to the RippleRenderer for the tab-link.
    protected _tabLinkRipple: RippleRenderer;

    ngOnDestroy() {
        this._tabLinkRipple._removeTriggerEvents();

        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef);
        }
    }
}

// Boilerplate for applying mixins to MatTabNav.
export class XmatTabNavBase {
    constructor(public _elementRef: ElementRef) {
    }
}

// tslint:disable-next-line:naming-convention
export const _XmatTabNavMixinBase: CanDisableRippleCtor & CanColorCtor & typeof XmatTabNavBase =
    mixinDisableRipple(mixinColor(XmatTabNavBase, "primary"));

@Component({
    // tslint:disable-next-line:component-selector
    selector: "[xmat-tab-nav-bar]",
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ["color", "disableRipple"],
    templateUrl: "xmat-nav-bar.component.html",
    styleUrls: ["xmat-nav-bar.component.scss"],
    host: {"class": "mat-tab-nav-bar"},
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmatTabNavComponent extends _XmatTabNavMixinBase
    implements AfterContentChecked, AfterContentInit, CanColor, CanDisableRipple, OnDestroy {


    @ViewChild(XmatInkBarDirective) _inkBar: XmatInkBarDirective;

    // Query list of all tab links of the tab navigation.
    @ContentChildren(forwardRef(() => XmatTabLinkDirective), {descendants: true})
    _tabLinks: QueryList<XmatTabLinkDirective>;


    // Background color of the tab nav.
    @Input()
    get backgroundColor(): ThemePalette {
        return this._backgroundColor;
    }

    set backgroundColor(value: ThemePalette) {
        const nativeElement: HTMLElement = this._elementRef.nativeElement;

        nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);

        if (value) {
            nativeElement.classList.add(`mat-background-${value}`);
        }

        this._backgroundColor = value;
    }


    // Subject that emits when the component has been destroyed.
    private readonly _onDestroy = new Subject<void>();
    private _activeLinkChanged: boolean;
    private _activeLinkElement: ElementRef<HTMLElement> | null;
    private _backgroundColor: ThemePalette;

    constructor(elementRef: ElementRef,
                @Optional() private _dir: Directionality,
                private _ngZone: NgZone,
                private _changeDetectorRef: ChangeDetectorRef,
                private _viewportRuler: ViewportRuler) {
        super(elementRef);
    }

    // Notifies the component that the active link has been changed.
    updateActiveLink(element: ElementRef) {
        // Note: keeping the `element` for backwards-compat, but isn't being used for anything.
        // @breaking-change 8.0.0
        this._activeLinkChanged = !!element;
        this._changeDetectorRef.markForCheck();
    }

    ngAfterContentInit(): void {
        this._ngZone.runOutsideAngular(() => {
            const dirChange = this._dir ? this._dir.change : observableOf(null);

            return merge(dirChange, this._viewportRuler.change(10))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._alignInkBar());
        });
    }

    // Checks if the active link has been changed and, if so, will update the ink bar.
    ngAfterContentChecked(): void {
        if (this._activeLinkChanged) {
            const activeTab = this._tabLinks.find(tab => tab.active);

            this._activeLinkElement = activeTab ? activeTab._elementRef : null;
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    // Aligns the ink bar to the active link.
    _alignInkBar(): void {
        if (this._activeLinkElement) {
            this._inkBar.show();
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
        else {
            this._inkBar.hide();
        }
    }

}
*/
