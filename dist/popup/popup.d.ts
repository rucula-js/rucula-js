import { callbackYesNo } from "./callback";
type configCommon = {
    text?: string;
    htmlBody?: HTMLElement;
    timeout?: number;
    disableadFooter?: boolean;
    disableadHeader?: boolean;
};
export declare let popup: {
    messsage: {
        info: (config: configCommon, callback?: callbackYesNo) => void;
        sucess: (config: configCommon, callback?: callbackYesNo) => void;
        warning: (config: configCommon, callback?: callbackYesNo) => void;
        error: (config: configCommon, callback?: callbackYesNo) => void;
    };
    notify: {
        sucess: () => void;
    };
};
export {};
