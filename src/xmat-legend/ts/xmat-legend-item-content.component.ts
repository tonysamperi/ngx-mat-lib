import { Component, ViewChild, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "xmat-legend-item-content",
  templateUrl: "../tpl/xmat-legend-item-content.component.html",
  encapsulation: ViewEncapsulation.None,
})

export class XmatLegendItemContentComponent {

  @ViewChild("xMatLegendItemContent") xMatLegendItemContent: TemplateRef<any>;
  content: string;

}
