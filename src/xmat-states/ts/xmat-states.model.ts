/**
 * States can be either
 * 0: raw
 * 1: pending
 * 2: toDelete
 * 3: toAdd
 * 4: toEdit
 */
export enum XmatStates {
    "raw",
    "pending",
    "toDelete",
    "toAdd",
    "toEdit",
    "disaligned"
}
export enum XmatStatesLabelsMap {
    "Valori integri",
    "Valori pending",
    "Valori in eliminazione",
    "Valori in aggiunta",
    "Valori in modifica",
    "Valori disallineati",
}

export interface StatesClassNames {
    disaligned?: string;
    pending?: string;
    raw?: string;
    toAdd?: string;
    toDelete?: string;
    toEdit?: string;
}
