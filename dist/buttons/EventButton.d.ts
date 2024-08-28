import { button } from '../entities/form/button';
import { FieldDOM } from '../elements/form/ElementsInput';
import { ManagmentObject } from '../object/ObjectManagment';
export declare class EventButton {
    fieldDOM: FieldDOM;
    managmentObject: ManagmentObject;
    constructor(fieldDOM: FieldDOM, managmentObject: ManagmentObject);
    eventButton(pathController: string, buttons: button[]): void;
    openCloseRightListButtons(): void;
}
