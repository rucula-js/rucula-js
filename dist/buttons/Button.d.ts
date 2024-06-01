import { button } from '../entities/form/button';
export declare let buttonsDOM: {
    createButtonOrLink: (button: button) => HTMLButtonElement | HTMLAnchorElement;
    prepareButtonsInLeftBox: (button: button[]) => void;
    buttonIsNotDefault: (target: string) => boolean;
    disable: (target: string) => void;
    enable: (target: string) => void;
    hide: (target: string) => void;
    destroy: (target: string) => void;
};
