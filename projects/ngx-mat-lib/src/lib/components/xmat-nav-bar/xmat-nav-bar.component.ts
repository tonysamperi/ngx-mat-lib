// tslint:disable:member-ordering

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
import {ANIMATION_MODULE_TYPE} from "@angular/platform-browser/animations";
import {Directionality} from "@angular/cdk/bidi";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {ViewportRuler} from "@angular/cdk/overlay";
import {FocusMonitor, FocusableOption} from "@angular/cdk/a11y";
import {Platform} from "@angular/cdk/platform";
import {
    ThemePalette,
    CanColor,
    CanDisableRipple,
    CanDisableRippleCtor,
    mixinDisableRipple,
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
import {XmatPaginatedTabHeaderDirective, XmatPaginatedTabHeaderItem} from "./xmat-paginated-tab-header";
//
import {takeUntil, startWith} from "rxjs/operators";

/**
 * Base class with all of the `MatTabNav` functionality.
 * @docs-private
 */
// tslint:disable-next-line:naming-convention class-name
export abstract class _XmatTabNavBase extends XmatPaginatedTabHeaderDirective
    implements AfterContentChecked, AfterContentInit, OnDestroy {

    /** Query list of all tab links of the tab navigation. */
    abstract _items: QueryList<XmatPaginatedTabHeaderItem & { active: boolean }>;

    /** Background color of the tab nav. */
    @Input()
    get backgroundColor(): ThemePalette {
        return this._backgroundColor;
    }

    set backgroundColor(value: ThemePalette) {
        const classList = this._elementRef.nativeElement.classList;
        classList.remove(`mat-background-${this.backgroundColor}`);

        if (value) {
            classList.add(`mat-background-${value}`);
        }

        this._backgroundColor = value;
    }

    private _backgroundColor: ThemePalette;

    /** Whether the ripple effect is disabled or not. */
    @Input()
    get disableRipple() {
        return this._disableRipple;
    }

    set disableRipple(value: any) {
        this._disableRipple = coerceBooleanProperty(value);
    }

    private _disableRipple: boolean = false;

    /** Theme color of the nav bar. */
    @Input() color: ThemePalette = "primary";

    constructor(elementRef: ElementRef,
                @Optional() dir: Directionality,
                ngZone: NgZone,
                changeDetectorRef: ChangeDetectorRef,
                viewportRuler: ViewportRuler,
                /**
                 * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
                 */
                @Optional() platform?: Platform,
                @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
        super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    }

    protected _itemSelected() {
        // noop
    }

    ngAfterContentInit() {
        // We need this to run before the `changes` subscription in parent to ensure that the
        // selectedIndex is up-to-date by the time the super class starts looking for it.
        this._items.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            this.updateActiveLink();
        });

        super.ngAfterContentInit();
    }

    /**
     * Notifies the component that the active link has been changed.
     * @breaking-change 8.0.0 `element` parameter to be removed.
     */
    updateActiveLink(_element?: ElementRef) {
        if (!this._items) {
            return;
        }

        const items = this._items.toArray();

        for (let i = 0; i < items.length; i++) {
            if (items[i].active) {
                this.selectedIndex = i;
                this._changeDetectorRef.markForCheck();
                return;
            }
        }

        // The ink bar should hide itself if no items are active.
        this.selectedIndex = -1;
        this._inkBar.hide();
    }
}


@Component({
    // tslint:disable-next-line:component-selector
    selector: "[xmat-tab-nav-bar]",
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ["color", "disableRipple"],
    templateUrl: "xmat-nav-bar.component.html",
    styleUrls: ["xmat-nav-bar.component.scss"],
    // host: {"class": "mat-tab-nav-bar"},
    host: {
        "class": "mat-tab-nav-bar mat-tab-header",
        "[class.mat-tab-header-pagination-controls-enabled]": "_showPaginationControls",
        "[class.mat-tab-header-rtl]": "_getLayoutDirection() == \"rtl\"",
        "[class.mat-primary]": "color !== \"warn\" && color !== \"accent\"",
        "[class.mat-accent]": "color === \"accent\"",
        "[class.mat-warn]": "color === \"warn\"",
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmatTabNavComponent extends _XmatTabNavBase
    implements AfterContentChecked, AfterContentInit, CanColor, CanDisableRipple, OnDestroy {

    @ContentChildren(forwardRef(() => XmatTabLinkDirective), {descendants: true}) _items: QueryList<XmatTabLinkDirective>;
    @ViewChild(XmatInkBarDirective) _inkBar: XmatInkBarDirective;
    @ViewChild("tabListContainer") _tabListContainer: ElementRef;
    @ViewChild("tabList") _tabList: ElementRef;
    @ViewChild("nextPaginator") _nextPaginator: ElementRef<HTMLElement>;
    @ViewChild("previousPaginator") _previousPaginator: ElementRef<HTMLElement>;

    constructor(elementRef: ElementRef,
                @Optional() dir: Directionality,
                ngZone: NgZone,
                changeDetectorRef: ChangeDetectorRef,
                viewportRuler: ViewportRuler,
                /**
                 * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
                 */
                @Optional() platform?: Platform,
                @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
        super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
    }
}


// Boilerplate for applying mixins to MatTabLink.
class XmatTabLinkMixinBase {
}

const _XmatTabLinkMixinBase:
    HasTabIndexCtor & CanDisableRippleCtor & CanDisableCtor & typeof XmatTabLinkMixinBase =
    mixinTabIndex(mixinDisableRipple(mixinDisabled(XmatTabLinkMixinBase)));

/** Base class with all of the `MatTabLink` functionality. */
// tslint:disable-next-line:class-name naming-convention
export class _XmatTabLinkBase extends _XmatTabLinkMixinBase implements OnDestroy, CanDisable,
    CanDisableRipple, HasTabIndex, RippleTarget, FocusableOption {

    /** Whether the tab link is active or not. */
    protected _isActive: boolean = false;

    /** Whether the link is active. */
    @Input()
    get active(): boolean {
        return this._isActive;
    }

    set active(value: boolean) {
        if (value !== this._isActive) {
            this._isActive = value;
            this._tabNavBar.updateActiveLink(this.elementRef);
        }
    }

    /**
     * Ripple configuration for ripples that are launched on pointer down. The ripple config
     * is set to the global ripple options since we don't have any configurable options for
     * the tab link ripples.
     * @docs-private
     */
    rippleConfig: RippleConfig & RippleGlobalOptions;

    /**
     * Whether ripples are disabled on interaction.
     * @docs-private
     */
    get rippleDisabled(): boolean {
        return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
            !!this.rippleConfig.disabled;
    }

    constructor(
        private _tabNavBar: _XmatTabNavBase, public elementRef: ElementRef,
        @Optional() @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) globalRippleOptions: RippleGlobalOptions | null,
        @Attribute("tabindex") tabIndex: string, private _focusMonitor: FocusMonitor,
        @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
        super();

        this.rippleConfig = globalRippleOptions || {};
        // tslint:disable-next-line:radix
        this.tabIndex = parseInt(tabIndex) || 0;

        if (animationMode === "NoopAnimations") {
            this.rippleConfig.animation = {enterDuration: 0, exitDuration: 0};
        }

        _focusMonitor.monitor(elementRef);
    }

    focus() {
        this.elementRef.nativeElement.focus();
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef);
    }
}

/**
 * Link inside of a `mat-tab-nav-bar`.
 */
@Directive({
    selector: "[xmat-tab-link], [xmatTabLink]",
    exportAs: "xmatTabLink",
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ["disabled", "disableRipple", "tabIndex"],
    host: {
        "class": "mat-tab-link",
        "[attr.aria-current]": "active ? \"page\" : null",
        "[attr.aria-disabled]": "disabled",
        "[attr.tabIndex]": "tabIndex",
        "[class.mat-tab-disabled]": "disabled",
        "[class.mat-tab-label-active]": "active",
    }
})
export class XmatTabLinkDirective extends _XmatTabLinkBase implements OnDestroy {
    /** Reference to the RippleRenderer for the tab-link. */
    private _tabLinkRipple: RippleRenderer;

    constructor(
        tabNavBar: XmatTabNavComponent, elementRef: ElementRef, ngZone: NgZone,
        platform: Platform,
        @Optional() @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) globalRippleOptions: RippleGlobalOptions | null,
        @Attribute("tabindex") tabIndex: string, focusMonitor: FocusMonitor,
        @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
        super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
        this._tabLinkRipple = new RippleRenderer(this, ngZone, elementRef, platform);
        this._tabLinkRipple.setupTriggerEvents(elementRef.nativeElement);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._tabLinkRipple._removeTriggerEvents();
    }
}
