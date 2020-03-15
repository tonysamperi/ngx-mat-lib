#1.1.8
* Added changelog.md
* Added isNumeric function to xmat-functions-service.ts
* Added isValidLength function to xmat-functions-service.ts

#1.1.9
* Fixed broken package
* Added publish procedure to README.MD

#1.1.10
* Fixed isValidLength function

#1.1.11
* Extended margin and padding classes up to 50px

#1.1.12
* Fixed external template for xmat-accordion (404 when using it)

#1.1.13
* Changed CustomDateAdapter according to [this stack overflow](https://stackoverflow.com/questions/48762645/material-datepicker-parses-incorrectly-if-user-write-date-in-input)

#1.1.14
* Added parser to xmat-date-locale.service

#1.1.15
* Fixed XmatActionText and XmatAccordion (host issue)

#1.1.16
* Fixed XmatDateLocale to fully recognize valid/invalid dates
* Improved css rules for margin/padding
* Added CSS build to provide hints when developing

#1.1.17
* Fixed extra "px" in dynamic margin/padding rules

#1.1.18
* Removed useless generated CSS stylesheets
* Fixed wrongly generated float rule (center)

#1.1.19
* Splitted xmat-library in components
* Added grid system (bootstrap style) in xmat-library
* removed useless OnInit from xmat-accordion

#1.1.20
* Added XmatAlertDialogComponent (based on sweet-alert-2)
* Fixed templates for XmatDialogModule
* Fixed template for XmatSnackBarComponent

#1.1.21
* Improved XmatAlertData (optional data)
* Added missing options in XmatAlertData
* Improved XmartAlertDialogComponent template
* Fixed missing *ngIf on "cancelButton"

#1.1.22
* Fixed XmatAlertData handling (key)

#1.1.23
* Fixed XmatAlertData handling (check for undefined)

#1.1.24
* Fixed missing dialogContent in XmatAlertData (Modal content)

#1.1.25
* Removed useless *ngIf causing XmatAlertDialog actions not to show

#1.1.26
* Improved actions disposition in XmatAlertDialog (center if one)

#1.1.27
* Fixed null-pointer in XmatAlertDialog

#1.1.28
* Moved to generator-ng5-library to support double quotes in templateUrl (damn I'll have to move all the templates back outside)
* Export of xmat-alert-dialog content
* Removed response object from mock console
* Improved xmat-overlay to deal with inline containers and restore when destroied
* Added buttons style input for alert dialog with default to "primary"
* Fixed alert actions position
* General improvements

#1.1.29
* Fixed success symbol in xmat-alert-dialog

#1.1.30
* Fixed success symbol in xmat-alert-dialog overlapping stuff below

#1.1.31
* Fixed unused parameter showCloseButon on xmat-alert-dialog

#1.1.32
* Fixed returned Observable type of openAlertDialog in xmat-functions-service

#1.1.33
* Fixed destroy function for xmat-spinner
* Renamed ValidListValidator
* Moved to outer template for xmat-spinner
* Removed useless "hidden" attribute from xmat-spinner 

#1.1.34
* Changed xmat-padding rules to have full box padding with multiples of 8
* Added xmat-opacity-half

#1.1.35
* Added optional override for method, valid only when using customUrl in xmat-mock

#1.1.36
* Fixed request body creation in put case of xmat-rest

#1.1.37
* Fixed xmat-snackbar data (duration)
* Added panelClass handling in xmat-snackbar

#1.1.38
* Improved xmat-constants behaviour: removed param to avoid creation of extended class
* Playground updated

#1.1.39
* Actually not an update. Just messed with version number :(

#1.1.40
* Fixed missing dependency on Xmat Dialog Module

#1.1.41
* Fixed "flex-layout" dependency on Xmat Dialog Module

#1.1.42
* Removed "flex-layout" dependency on Xmat Dialog Module (actually useless)

#1.1.43
* Refactor: moved models in proper files
* Added params for confirm dialog
* New label for "continue" confirmation
* Playground scss updated and built

#1.1.44
* Removed useless dependency to constants

#1.1.45
* Improved XmatMock to support param inside url
* Refactor
* Changed placeholders structure in xmatConstants

#1.1.46
* Removed xmat-states component and SCSS
* Added xmat-legend component
* Improved npm commands in package
* Playground updated with xmat-legend

#1.2.0
* Updated deps to latest Angular5 (5.2.11 - July 2018)

#1.2.1
* Fixed import problem "mixinColor" from @angular/material (xmatAccordion + xmatActionText)
* Playground updated - Removed useless import of Flex-layout

#1.2.2
* Fixed computed property error

#1.2.3
* Set image height to a reasonable value in xmat-legend
* Added util to loop over string enums in xMatFunctions

#1.2.4
* Fixed flex responsive behaviour in xmat-legend

#1.2.5
* Removed fixed width for 'li' tags

#1.2.6
* Removed reserved keyword continue from labels
* Remove read only decorators from props which would be useful to extend
* Cloned const XMAT_LABELS to allow extension
* Refactored usage of "xmatConstants.labels.continue"

#1.2.7
* Refactor: adding types for functions and objects

#1.2.8
* Fixed mock handling for middle param

#1.2.9
* Renamed XmatSelectOptions to XmatDescValuePair
* Generic added for XmatDescValuePair

#1.2.10
* Removed xmat-menu since it was pretty much pointless

#1.2.11
* Improved xmat-mock: you can now disable logging and customize the default delay
* Removed useless console and ngOnInit from xmat-action
* Refactor

#1.2.12
* Fixed cuzomizable default delay in xmat-mock

#1.2.13
* Fixed playground lodash issue

#1.3.1
* Fixed xmat-accordion disabled
* Implemented xmat-action disabled
* Moved templates in HTML files (with ng5-library, we can use double quotes :D )
* Deleted useless stuff such as RouteGuard
* Improved folders structure
* Renamed xmatOverlayStyles to XmatOverlayStyles (consistent code style)

#1.3.2
* Fixed timer dependency in xmat-mock
* Fixed missing exports
* Added missing log above (xmatOverlayStyles)
* Updated lodash version in package.json

#1.3.3
* Added XmatRestVerbs and XmatDynamicRestVerbsRef to better handle rest verbs and refs
* Used XmatGenericObject in XmatConstantsService
* Refactor

#1.3.4-b
* Beta to test peerDependencies (solving services injection issue)
* Added module to import XmatFunctionsService
* Added missing export in XmatDialogModule
* New package & gulp tasks to build locally

#1.3.4-beta.2
* Adjusting peerDependencies

#1.3.4-beta.3
* Adjusting peerDependencies

#1.3.5
* Stable version with 'emitDecoratorMetadata'@true
* Fixed gulp tasks sync
* Removed warnings from rollup
* Improved rollup tasks
* Removed XmatServicesModule - Useless now
* Misc

#1.3.6
* Added logWithStyle in xmat-functions
* Dynamic content for xmat-confirm-dialog
* Changed style of xmat-confirm-dialog
* New labels in xmat-constants-service
* Fixed xmat-legend async content issue
* Improved readme, added todos

#1.3.7
* Added customParent to xmat-spinner
* Fixed xmat-spinner style (explicit top and left positions)

#1.3.8
* Improved XmatTime 
* Fixed XmatTime label styling (no css required outside)
* Fixed legend-item content bug (wrong ref))

#1.3.9
* Temp fix for ngc compile error (not when packaging this)

#1.3.10
* Final fix for ngc compile error (not when packaging this) on XmatConfirmDialog

#1.3.11
* Added check on undefined input in xmat-legend

#1.3.12
* Added new validations

#1.3.13
* New xmat-badge directive, cloned from material 6
* Copy directives SCSS files to output allowing the use of xmat-library.scss
* Changed xmat-action-text to directive, to allow using on components

#1.3.14
* Switched to protected for xmat-mock members

#1.3.15
* Consistent code style

#1.3.16
* Added option to return DialogRef in XmatFunctions
* Added transparent mode to XmatOverlay
* Fixed version

#1.3.17 (removed)
* Fixed DialogRef option in XmatFunctions using overload

#1.3.18 (removed)
* Fixed backwards compatibility (optional params) in XmatFunctions.openConfirmDialog

#1.3.19
* Fixed backwards compatibility (FOR REAL) in XmatFunctions.openConfirmDialog

#1.3.20
* Fixed component instance in xmat-confirm-dialog

#1.3.21
* Fixed missing class breaking xmat-time placeholder graphics

#1.3.22
* Min width on xmat-time-input avoids graphic issues on responsive layouts

#1.3.23
* Updated node-sass, fixed to 4.9.3
* gitignore improved

#1.3.24
* Fixed package.json

#1.3.25
* Added "confirmColor" (ThemePalette) to XmatDialogData model
* Better handling of XmatDialogData defaults: optional params + merge defaults 

#1.3.26
* added xmat-text-ellipsis in xmat-library css/scss
* improved elapsed time calcs (fixes undefined error when using XmatMock if not declared window.times)
* added new global XmatLib

#2.0.0
* Fixed to canonical angular library architecture

#2.0.1
* Fixed conflicts between mat-label and placeholder in xmat-time-input
* Removed that horrible playground.
* Added display.scss with display utils: bootstrap4 adaptation in @angular/flex style
* Fixed XmatMock not detecting mocks urls with multiple params
* Fixed SCSS vars
* Changed $xmat-breakpoints not to hold media queries

#2.0.2
* Fixed mock search system (bad key creation issue)
* New test files

#2.0.3
* Deleted package-lock
* Added pack task in gulpfile and package.json

#2.0.4
* Replaced carets (^) in package with tildes (~)

#2.0.5
* Fixed xmat-overlay styling
* Added custom z-index via @Input()
* Added rules for consistent code style

#2.0.6
* Removed useless "position: relative" and "z-index" from xmat-accordion

#2.0.7
* Improved XmatTime model to add leading zeroes
* Consistent style for gulpfile

#2.0.8
* Removed multiple typing for XmatTime getHours and getMinutes

#2.0.9
* Added "returnRef" option for XmatAlertDialog
* Added "dialogId" option for XmatAlertDialog (useful to retrieve ref)
* Added "dialogId" option for XmatConfirmDialog (useful to retrieve ref)
* Refactor

#2.0.10
* Refactor
* Fixed missing background transparent in XmatOverlay

#2.0.11
* Refactor
* Enabled polyfills in test app
* Added getBlobFromUrl method in XmatRestService
* Added downloadBlobFromUrl in XmatRestService
* New model XmatFile
* Test App updated

#2.0.12
* Added missing dependency in XmatSnackBarModule
* Added new XmatFunctionsModule which allows a seamless import of XmatFunctionsService

#2.0.13
* Fixed docs

#2.0.14
* Removed FormsModule from XmatDialogModule (useless)
* Refactor

#2.0.15
* Export MatDialogModule from XmatDialogModule to make it accessible from outside

#2.0.16
* Fixed missing @Injectable deoorator in XmatDateLocaleService
* Fixed missing "index" in imports in xmat-services/index
* Fixed wrong type in xmat-app.component
* Refactor

#2.0.17
* Definite fix for using XmatFunctions.

#2.0.18
* Fixed xmat-legend behaviour when filling cols
* Refactor

#2.1.0
* Gulpfile refactored
* Names for XmatBadge models fixed
* XmatBadge Directive refactored

#6.1.10
* Update to Angular 6.1.10
* Renamed xmat-time-input to xmat-time
* Removed xmat-element-ref model, since core now supports type in ElementRef (Angular 6+)
* Improved error handling in xmat-time component using errorState
* README improved
* Refactor

#7.2.0
* Update to Angular 7.2.0
* Added .xmat-uppercase, .xmat-lowercase, .xmat-capitalize in xmat-library

#7.2.1
* Types for XmatMock Callbacks
* Fixed simple mock callback params in XmatMock
* Refactor

#7.2.2
* Changed XmatDelayedHttpParams according to v 5-latest
* Fixed XmatTime appearance according to v 5-latest
* Updated demo app according to v 5-latest
* Added $all and $allMap in XmatRestService
* Misc and refactor

#7.2.3
* Added custom optional body class in xmat-library
* Fixed test:scss
* Now grid columns number can be overridden
* Styles refactor using @mixin
* Moved xmat-overrides to new file
* xmat-grid classnames can now be overridden

#7.2.4
* Fixed XmatHttpParams delay 
* Improved test app
* Misc and refactor

#7.2.5
* Fixed types for MatDialogRef returned in openConfirmDialog
* Fixed types for MatDialogRef returned in openAlertDialog

#7.2.6
* SASS refactor: added xmat-functions to generate base palettes

#7.2.7
* Fix XmatTime style, solves icon position on IE

#7.2.8
* Added xmatFillAtLeast validation (checks for 1 valid field in group)
* Misc and refactor

#7.2.9
* XmatAlertDialog refactored
* XmatConstantsService labels moved to new file (will better deal with dictionary)
* New component XmatAlertBox similar to *alert in Bootstrap*
* XmatAlertTypes moved to new file (used now by new component XmatAlertBox)
* Refactored lodash imports (better complies with packager)
* New functions in XmatFunctionsService: extractQueryParams, filterProps
* New directive MatFormFieldRequired. Deals with MatFormField and ReactiveForms
* XmatDescValuePair renamed in XmatSelect (still suitable for radios)
* Misc and refactor

#7.2.10
* Reverted XmatAlertDialog colors
* Added XmatAlertDialog examples in Dialog Examples

#7.2.11
* Added controls for XmatAccordion: ExpandedHeight and CollapsedHeight
* Added emit for expanded attr in XmatAccordion
* Added PATCH verb in XmatRestVerbs and XmatRestService 

#7.2.12
* Typography improved

#7.2.13
* Version bump

#7.2.14
* Added handling for external control disabled/required states on XmatTime

#7.2.15
* Fix required mark on XmatTime on control disabled
* Fix wrong operator on errorState check

#7.2.16
* Added xmat-text-bold in xmat-typography.scss
* Rule ".xmat-capitalize-first-only" renamed to xmat-capitalize-first in xmat-typography.scss
* Added tslint in projects/ngx-mat-lib, solves tslint errors when using the lib sources directly (requires angular.json config) 
* Added new xmat-divider component since mat-divider change behaviour accordingly to container
* New component xmat-divider, which doesn't get influenced by containers (unlike mat-divider)
* Added xmat-capitalize-children
* Changed colors for xmat-alert disabled
* Added missing color for disabled-text
* Fixed xmat-confirm-dialog confirm button color override not working
* Added xmat-nav-bar.component to add navigation to nav-tab-bar
* Fixed package.json versions (resolves failing build due to tsickle release)
* Misc and refactor

 #7.2.17
 * new Pipe: XmatKebabCasePipe
 * new validations for XmatTimeComponent: MaxTime and MinTime
 * new regular expressions in XmatConstantsService to handle special chars and emojis
 * XmatFunctionsService: replaceAll (replaces multiple matches in string according to map)
 * XmatFunctionsService: showErrorSnackBar (similar to showErrorAlert) shortcut
 * XmatFunctionsService: stripEmojis and stripSpecialchars to cleanup strings
 * XmatMockService: fixed mockKey algorithm, finds better combinations of params and placeholders
 * XmatTimeComponent: fixed error handling on external controllers (turn red)
 * improved function xmatMinListSelection
 
 #7.2.18
 * Featured xmat-capitalize on mat-label element (capitalize works on d-block or d-inline-block elements)
 * New param for confirmDialog: additionalForm. Allows to control the "confirm" disabled state with an external Control
 * New param for confirmDialog: hideActions. Allows to hide both the dialog actions, useful when using a custom ref
 * "objectToArray" pipe refactored and fixed
 * Removed useless model XmatArrayItemFromObject
 * Added dynamic verb to getBlobFromUrl and downloadBlobFromUrl: now handles PATCH besides GET.
 * New component XmatSummary, which allows to print a simple data set
 * New component XmatMediaQueryState, to debug @angular/flex-layout states (peer dependency)
 * New function "objectToArray" in XmatFunctions
 * Renamed xmat-desc-value.model.ts to xmat-select.model (since it contains XmatSelect)
 * Misc and refactor

#7.3.0
* Simplified mocks handling with XmatRestVerbs instead of XmatConstantsService.methodKeys
* Removeed useless data from XmatConstantsService. That kind of data can be set externally (extending XmatConstantsService or custom files) 
* xmatValidListSelection: added reverse mode which returns error if value is in list
* Renamed XmatDynamicRestVerbsRef to XmatRestVerbsRef
* Misc and refactor

#7.3.1
* Folders structure improved (no breaking changes if you imported from ngx-mat-lib)
* Fixed XmatActionTextDirective disabled behaviour  
* Added XmatSimpleTableComponent
