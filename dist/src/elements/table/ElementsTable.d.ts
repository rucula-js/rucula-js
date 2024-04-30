import { frame } from "../../entities/form/frame";
export declare let frameLineTableDOM: {
    table: {
        header: {
            createHeader: (frame: frame) => HTMLTableSectionElement;
        };
        detail: {
            getCellActions: (tr: HTMLTableRowElement) => HTMLTableCellElement | null;
            createRowDetail: (frame: frame) => HTMLTableRowElement;
            createNewRowDetail: (identityObject: string) => HTMLTableRowElement;
            deleteRowDetail: (currentLineElement: HTMLTableRowElement, inputTargetEvent: HTMLInputElement) => void;
        };
    };
};
