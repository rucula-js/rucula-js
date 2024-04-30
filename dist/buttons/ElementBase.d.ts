import { button } from "../entities/form/button";
export declare class ElementBase {
    element: HTMLButtonElement | HTMLAnchorElement;
    addDataIdAttribute(button: button): void;
    addColor(color?: string): void;
}
