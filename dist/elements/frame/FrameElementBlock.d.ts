import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { FieldDOM } from "../form/ElementsInput";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElementBlock extends FrameElement {
    constructor(managmentObject: ManagmentObject, fieldDOM: FieldDOM, frameEvent: FrameEvent);
    create(frame: frame): HTMLDivElement;
}
