export enum XmatRestVerbs {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export type XmatDynamicRestVerbsRef<T> = { [key in keyof typeof XmatRestVerbs]: T };

