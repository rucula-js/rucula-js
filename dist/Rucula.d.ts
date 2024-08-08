import { window } from "./entities/form/window";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
import { URLRucula } from "./URL/urlManagment";
export declare class Rucula {
    private window;
    private elementRucula;
    private elementFormRucula;
    constructor(config: {
        global: globalConfiguration;
        window: window;
        id: string | undefined;
    });
    create(): void;
    private addHomeWindow;
    private createButtons;
    private createFrames;
    loader: {
        enable: () => void;
        disable: () => void;
    };
    popup: {
        messsage: {
            info: (config: {
                text?: string;
                htmlBody?: HTMLElement;
                timeout?: number;
                disableadFooter?: boolean;
                disableadHeader?: boolean;
            }, callback?: import("./popup/callback").callbackYesNo) => void;
            sucess: (config: {
                text?: string;
                htmlBody?: HTMLElement;
                timeout?: number;
                disableadFooter?: boolean;
                disableadHeader?: boolean;
            }, callback?: import("./popup/callback").callbackYesNo) => void;
            warning: (config: {
                text?: string;
                htmlBody?: HTMLElement;
                timeout?: number;
                disableadFooter?: boolean;
                disableadHeader?: boolean;
            }, callback?: import("./popup/callback").callbackYesNo) => void;
            error: (config: {
                text?: string;
                htmlBody?: HTMLElement;
                timeout?: number;
                disableadFooter?: boolean;
                disableadHeader?: boolean;
            }, callback?: import("./popup/callback").callbackYesNo) => void;
        };
        notify: {
            sucess: () => void;
        };
    };
    event: {
        field: {
            getDetails: (event: CustomEvent<any>) => {
                identity: string;
                name: any;
                row: any;
                value: any;
                targetPathWithRow: (targetPath: string) => string;
            };
        };
        on: (event: string, callback: any, query?: string) => void;
    };
    buttons: {
        createButtonOrLink: (button: import("./entities/form/button").button) => HTMLAnchorElement | HTMLButtonElement;
        prepareButtonsInLeftBox: (button: import("./entities/form/button").button[]) => void;
        buttonIsNotDefault: (target: string) => boolean;
        disable: (target: string) => void;
        enable: (target: string) => void;
        hide: (target: string) => void;
        destroy: (target: string) => void;
    };
    url: (URL?: {
        absolute: string;
        relative: string;
        params: string;
    }) => URLRucula;
    object: {
        objectUnique: (alias: string) => any;
        getFullObject: () => any;
        getSepareteObject: () => any;
        setValue: (targetPath: string, value: any) => void;
        getValue: (config: string) => any;
    };
}
