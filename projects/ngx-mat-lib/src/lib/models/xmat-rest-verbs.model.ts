export enum XmatRestVerbs {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export type XmatRestVerbsRef<T> = { [key in keyof typeof XmatRestVerbs]: T };

