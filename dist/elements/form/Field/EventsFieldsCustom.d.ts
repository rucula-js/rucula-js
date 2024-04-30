export type identity = {
    name: string;
    element: HTMLElement;
    row: number | undefined;
};
export declare let eventsCustom: {
    field: () => {
        set: (identity: identity) => void;
        get: (eventName: string) => any;
    };
};
