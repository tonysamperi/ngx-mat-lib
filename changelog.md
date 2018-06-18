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
