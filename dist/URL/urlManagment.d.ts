export declare class URLRucula {
    private _URL?;
    private callbackGetPropert;
    constructor(callbackGetPropert: any, URL?: {
        absolute: string;
        relative: string;
        params: string;
    });
    getURL(): string;
    domain(env?: string): string;
    path(path: string): string;
    private createWithParams;
    private createWithoutParams;
}
