export enum XmatRestVerbs {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export type XmatDynamicRestVerbsRef<T> = {[key in keyof typeof XmatRestVerbs]: T};

