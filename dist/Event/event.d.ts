export declare let eventManagment: {
    field: {
        getDetails: (event: CustomEvent) => {
            identity: string | null;
            name: any;
            row: any;
            value: any;
            targetPathWithRow: (targetPath: string) => string;
        };
    };
    on: (event: string, callback: any, query?: string) => void;
};
