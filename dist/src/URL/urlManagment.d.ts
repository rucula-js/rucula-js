import { button } from "../entities/form/button";
export declare let urlManagment: {
    createURL: (controller: string, button: button) => string;
    createWithParams: (path: string) => string;
    createWithoutParams: (path: string) => string;
    createPath: (path: string) => string;
};
