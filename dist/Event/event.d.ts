import { ManagmentObject } from "../object/ObjectManagment";
export declare class EventManagment {
    managmentObject: ManagmentObject;
    constructor(managmentObject: ManagmentObject);
    getFieldDetails(event: CustomEvent): {
        identity: string;
        name: any;
        row: any;
        value: any;
        targetPathWithRow: (targetPath: string) => string;
    };
    on(event: string, callback: any, query?: string): void;
}
