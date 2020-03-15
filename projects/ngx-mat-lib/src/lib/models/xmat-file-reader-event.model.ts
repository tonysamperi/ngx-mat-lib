export interface XmatFileReaderEvent extends ProgressEvent {
    target: XmatFileReaderEventTarget;
}

export interface XmatFileReaderEventTarget extends EventTarget {
    result: string;
    getMessage: () => string;
}
