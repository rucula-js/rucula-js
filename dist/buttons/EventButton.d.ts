import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { ManagmentObject } from '../object/ObjectManagment';
export declare class EventButton {
    field: Field;
    managmentObject: ManagmentObject;
    constructor(field: Field, managmentObject: ManagmentObject);
    eventButton(pathController: string, buttons: button[]): void;
    openCloseRightListButtons(): void;
}
