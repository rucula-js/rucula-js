export declare let buttonsBase: {
    initButtonsTypeCrudDefault: () => void;
    initButtonPlus: () => void;
    buttonsTypeCrud: {
        click: {
            create: () => void;
            alter: () => void;
            delete: () => void;
        };
        remove: {
            create: () => void;
            alter: () => void;
            delete: () => void;
        };
        crud: (crud: string) => void;
    };
};
