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

#1.3.17
* Fixed DialogRef option in XmatFunctions using overload

#1.3.18
* Fixed backwards compatibility (optional params) in XmatFunctions.openConfirmDialog
