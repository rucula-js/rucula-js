import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { FieldDOM } from "../form/ElementsInput";
import { FameLineTable } from "../table/ElementsTable";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElementLine extends FrameElement {
    fameLineTable: FameLineTable;
    constructor(managmentObject: ManagmentObject, fieldDOM: FieldDOM, frameEvent: FrameEvent);
    private createTDActions;
    create(frame: frame): HTMLDivElement;
    currentLineElement?: HTMLElement;
    inputTargetEvent?: HTMLInputElement;
    createNewLine(currentLineElement: HTMLTableRowElement, element: HTMLElement): void;
    deleteLine(currentLineElement: HTMLTableRowElement, element: HTMLInputElement): void;
    crudLineQuadro(event: Event): void;
    eventActions(actions: HTMLDivElement): void;
    eventKeyDownKeyUpLineFrame(element: HTMLElement): void;
    addActionsInCell(tr: HTMLTableRowElement, identity: string): void;
}
