import {Component} from "@angular/core";
import {XmatFile} from "ngx-mat-lib";
import {SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {XmatRestService} from "ngx-mat-lib";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: "xmat-download",
    templateUrl: "./xmat-download.component.html",
    styleUrls: ["./xmat-download.component.scss"]
})

export class XmatDownloadComponent {

    downloadResource: SafeResourceUrl;
    files: XmatFile[] = [
        {fileName: "sample-pdf.pdf", url: "./assets/sample-pdf.pdf", desc: "Lorem ipsum dolor PDF"},
        {fileName: "sample-text.txt", url: "./assets/sample-text.txt", desc: "Lorem ipsum dolor TXT"}
    ];

    constructor(private _http: HttpClient,
                private _rest: XmatRestService,
                private _sce: DomSanitizer) {

    }

    doDownload(file: XmatFile) {
        return this._rest.downloadBlobFromUrl(file);
    }

    loadBlob(file: XmatFile) {
        if (!file) {
            return false;
        }
        this.downloadResource = void 0;
        this._rest.getBlobFromUrl(file).subscribe((results: Blob) => {
            const unsafeLink = URL.createObjectURL(results);
            this.downloadResource = this._sce.bypassSecurityTrustResourceUrl(unsafeLink);
        });
    }

}
