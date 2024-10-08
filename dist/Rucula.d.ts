import { window } from "./entities/form/window";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
import { Popup } from "./popup/popup";
import { EventManagment } from "./Event/event";
import { URLRucula } from "./URL/urlManagment";
import { ManagmentObject } from "./object/ObjectManagment";
import { TableDependency } from "./table-dependency/TableDependency";
export declare class Rucula {
    private window;
    private elementRucula;
    private elementFormRucula;
    popup: Popup;
    event: EventManagment;
    managmentObject: ManagmentObject;
    tableDependency: TableDependency;
    private layoutFrame;
    private fragment;
    private field;
    private eventButton;
    private frameEvent;
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
