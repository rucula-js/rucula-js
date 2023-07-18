import { Injectable } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Injectable({
    providedIn: 'root',
})
export class CreatePopperService{

    createPopper(popcorn:Element,tooltip:HTMLElement){    
        createPopper(popcorn as Element, tooltip as HTMLElement,  {
            placement: "top",
            modifiers: [
            {
                name: "offset",
                options: {
                offset: [0, 8]
                }
            }
            ]
        });
        }
}