import { Button } from "../../buttons/Button";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElement {
    protected managmentObject: ManagmentObject;
    protected field: Field;
    protected frameEvent: FrameEvent;
    protected button: Button;
    constructor(managmentObject: ManagmentObject, field: Field, frameEvent: FrameEvent, button: Button);
    protected createbase(frame: frame): HTMLDivElement;
    protected setValuesDefined(frame: frame, htmlElement: HTMLElement): void;
}
