import {Injectable} from "@angular/core";
import {XmatRestVerbsRef, XmatGenericObject, XmatConstantsLabels} from "../models/index";

// tslint:disable-next-line:naming-convention
export const XMAT_CONSTANT_LABELS: XmatConstantsLabels = {
    accept: "Ok",
    cancel: "Annulla",
    changedMind: "Ci ho ripensato",
    close: "Chiudi",
    confirm: "Sono sicuro",
    days: {
        full: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
        short: ["Lun", "Marì", "Mer", "Gio", "Ven", "Sab", "Dom"]
    },
    errorTitle: "Errore durante l'elaborazione",
    genericError: "Errore tecnico generico",
    leave: "Me ne vado",
    months: {
        full: [
            "Gennaio", "Febbraio", "Marzo",
            "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre",
            "Ottobre", "Novembre", "Dicembre"
        ],
        short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
    },
    proceed: "Procedere?",
    stay: "Rimango qui",
    understood: "Ho capito",
    warningTitle: "Attenzione"
};

const emojiRanges = [
    "[\uE000-\uF8FF]",
    "\uD83C[\uDC00-\uDFFF]",
    "\uD83D[\uDC00-\uDFFF]",
    "[\u2011-\u26FF]",
    "\uD83E[\uDD10-\uDDFF]"
];


@Injectable()
export class XmatConstantsService {

    /**
     * PUBLIC STUFF
     */
    public readonly mocksEndings: { ok: string, ko: string } = {
        ok: ".ok.json",
        ko: ".ko.json"
    };
    public readonly mocksBaseUrl: string = "assets/services-mocks/";
    public restBaseUrl: string = "";

    public readonly dialogOptions: any = {
        defaultWidth: "400px",
        disableClose: true
    };

    public readonly ds: string = "/";

    public readonly fileNameSpace: string = "-";

    // These can be overridden by extending this class
    public labels: XmatConstantsLabels = {
        ...XMAT_CONSTANT_LABELS
    };

    public readonly paramsPlaceholder: string = "@params@";
    public readonly queryUrlParam: string = "@query@";

    public readonly regExps: XmatGenericObject<string> = {
        trailingWhiteSpaces: "\\s+$",
        leadingWhiteSpaces: "^\\s+",
        multipleWhiteSpaces: "\\s+(?=\\s)",
        specialChars: `[~!\`@#$%\\^&*()+=\\-\\[\\]\\';,\\/\\{}|\\\":<>\\?£¥÷_×]`,
        emojis: emojiRanges.join("|")
    };
    public readonly routeParams: string = "routeParams";

    constructor() {
    }

    /**
     * PUBLIC FUNCTIONS
     */

    isGenericObject(entity: any): boolean {
        return !!entity && entity === Object(entity) && !Array.isArray(entity);
    }

    isStrictlyObject(entity: any): boolean {
        return !!entity && entity === Object(entity) && entity.constructor === Object;
    }

    isObjectEmpty(obj: object): boolean {
        return !!obj && Object.keys(obj).length === 0;
    }

    noop(): void {
        // NOOP: DOES NOTHING
    }

    removeTrailingSlash(target: string): string {
        return target.replace(/\/$/, "");
    }
}
