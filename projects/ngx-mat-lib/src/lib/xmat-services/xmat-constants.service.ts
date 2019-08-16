import {Injectable} from "@angular/core";
import {XmatDynamicRestVerbsRef, XmatGenericObject, XmatConstantsLabels} from "../xmat-models/index";
import {cloneDeep} from "lodash";

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
    // URLS ARE NOT ALPHABETICALLY ORDERED SINCE IT'S LIKELY THAT THEY'LL CHANGE OFTEN AT THIS TIME

    public readonly dialogData: any = {
        checkOnSave: {
            title: XMAT_CONSTANT_LABELS.warningTitle,
            dialogContent: "<p>Si è certi di voler proseguire?</p>"
        },
        dataLoss: {
            title: XMAT_CONSTANT_LABELS.warningTitle,
            confirmText: XMAT_CONSTANT_LABELS.leave,
            cancelText: XMAT_CONSTANT_LABELS.stay,
            dialogContent: "<p>Ci sono dati non salvati. Proseguendo andranno persi.</p>\
                <p>Si è sicuri di voler abbandonare la view attuale?</p>"
        },
        invalidData: {
            title: XMAT_CONSTANT_LABELS.warningTitle,
            confirmText: XMAT_CONSTANT_LABELS.understood,
            hideCancelButton: true,
            dialogContent: "<p>Ci sono degli errori di compilazione. Ricontrollare i campi evidenziati in rosso.</p>"
        }
    };

    public readonly dialogOptions: any = {
        defaultWidth: "400px",
        disableClose: true
    };

    public readonly ds: string = "/";

    public readonly fileNameSpace: string = "-";

    public labels: XmatConstantsLabels = cloneDeep(XMAT_CONSTANT_LABELS);

    public messages: XmatGenericObject<string> = {
        warningTitle: XMAT_CONSTANT_LABELS.warningTitle,
        genericErrorKey: "generic.error"
    };

    public readonly methodsKeys: XmatDynamicRestVerbsRef<string> = {
        GET: "get-",
        PUT: "put-",
        POST: "post-",
        DELETE: "delete-"
    };

    public readonly paramsPlaceholder: string = "@params@";
    public readonly queryUrlParam: string = "@query@";

    public readonly regExps: XmatGenericObject<string> = {
        trailingWhiteSpaces: "\\s+$",
        leadingWhiteSpaces: "^\\s+",
        multipleWhiteSpaces: "\\s+(?=\\s)"
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
