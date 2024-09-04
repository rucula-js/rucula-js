import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
export declare class Button {
    private popup;
    private callbackReaload;
    constructor(callbackReaload: () => void);
    elementStrategy: ElementStrategy;
    buttonIsNotDefault(target: string): boolean;
    createButtonOrLink(button: button): HTMLButtonElement | HTMLAnchorElement;
    getButton(target: string): HTMLElement;
    prepareLocalizations(): void;
    prepareEnviroments(): void;
    prepareButtonsInLeftBox(button: button[]): void;
    disable(target: string): void;
    enable(target: string): void;
    hide(target: string): void;
    destroy(target: string): void;
}
