import { window } from "./entities/form/window";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
export declare class Rucula {
    private window;
    private elementRucula;
    private elementFormRucula;
    constructor(config: globalConfiguration, window: window, id?: string);
    private initWindow;
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
                text: string;
                timeout?: number | undefined;
                disableadFooter?: boolean | undefined;
                disableadHeader?: boolean | undefined;
            }, callback?: import("./popup/callback").callbackYesNo | undefined) => void;
            sucess: (config: {
                text: string;
                timeout?: number | undefined;
                disableadFooter?: boolean | undefined;
                disableadHeader?: boolean | undefined;
            }, callback?: import("./popup/callback").callbackYesNo | undefined) => void;
            warning: (config: {
                text: string;
                timeout?: number | undefined;
                disableadFooter?: boolean | undefined;
                disableadHeader?: boolean | undefined;
            }, callback?: import("./popup/callback").callbackYesNo | undefined) => void;
            error: (config: {
                text: string;
                timeout?: number | undefined;
                disableadFooter?: boolean | undefined;
                disableadHeader?: boolean | undefined;
            }, callback?: import("./popup/callback").callbackYesNo | undefined) => void;
        };
    };
    event: {
        field: {
            getDetails: (event: CustomEvent<any>) => {
                identity: string | null;
                name: any;
                row: any;
                value: any;
                targetPathWithRow: (targetPath: string) => string;
            };
        };
        on: (event: string, callback: any, query?: string | undefined) => void;
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
    object: {
        objectUnique: (alias: string) => any;
        getFullObject: () => any;
        getSepareteObject: () => any;
        setValue: (targetPath: string, value: any) => void;
        getValue: (config: string) => any;
    };
}
