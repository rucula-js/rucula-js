import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FrameElementLine } from "../frame/FrameElementLine";
import { FrameEvent } from "../frame/FrameEvent";
export declare class FameLineTable {
    private managmentObject;
    private field;
    private frameEvent;
    private frameElementLine;
    private callbackSetValuesDefined;
    constructor(managmentObject: ManagmentObject, field: Field, frameElementLine: FrameElementLine, frameEvent: FrameEvent, callbackSetValuesDefined: any);
    getCellActions(tr: HTMLTableRowElement): HTMLTableCellElement;
    createHeader(frame: frame): HTMLTableSectionElement;
    createRowDetail(frame: frame): HTMLTableRowElement;
    createNewRowDetail(identityObject: string): HTMLTableRowElement;
    deleteRowDetail(currentLineElement: HTMLTableRowElement, inputTargetEvent: HTMLInputElement): void;
}
