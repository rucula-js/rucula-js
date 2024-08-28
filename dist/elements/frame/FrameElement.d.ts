import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { FieldDOM } from "../form/ElementsInput";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElement {
    protected managmentObject: ManagmentObject;
    protected fieldDOM: FieldDOM;
    protected frameEvent: FrameEvent;
    constructor(managmentObject: ManagmentObject, fieldDOM: FieldDOM, frameEvent: FrameEvent);
    protected createbase(frame: frame): HTMLDivElement;
    protected setValuesDefined(frame: frame, htmlElement: HTMLElement): void;
}
