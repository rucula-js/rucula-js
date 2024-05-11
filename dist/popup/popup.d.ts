type configCommon = {
    text: string;
    timeout?: number;
    disableadFooter?: boolean;
};
export declare let popup: {
    messsage: {
        info: (config: configCommon) => void;
        sucess: (config: configCommon) => void;
        warning: (config: configCommon) => void;
        error: (config: configCommon) => void;
    };
};
export {};
