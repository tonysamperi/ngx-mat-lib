import {Component, ViewChild, TemplateRef, ViewEncapsulation} from "@angular/core";

@Component({
    selector: "xmat-dialog-content",
    templateUrl: "../tpl/xmat-dialog-content.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class XmatDialogContentComponent {

    @ViewChild("xMatDialogContent") xMatDialogContent: TemplateRef<any>;
    content: string;

}
