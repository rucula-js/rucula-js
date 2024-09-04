import { Button } from "../../buttons/Button";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElementBlock extends FrameElement {
    constructor(managmentObject: ManagmentObject, field: Field, frameEvent: FrameEvent, button: Button);
    create(frame: frame): HTMLDivElement;
}
