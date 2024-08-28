import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElement {
    protected managmentObject: ManagmentObject;
    protected field: Field;
    protected frameEvent: FrameEvent;
    constructor(managmentObject: ManagmentObject, field: Field, frameEvent: FrameEvent);
    protected createbase(frame: frame): HTMLDivElement;
    protected setValuesDefined(frame: frame, htmlElement: HTMLElement): void;
}
