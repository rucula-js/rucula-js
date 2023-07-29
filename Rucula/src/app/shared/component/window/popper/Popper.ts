import {  createPopper } from "@popperjs/core";

export function create (popcorn:Element,tooltip:HTMLElement){    
    createPopper(popcorn as Element, tooltip as HTMLElement,  {
        placement: "top",
        modifiers: [
        {
            name: "offset",
            options: {
            offset: [0, 8]
            }
        }]
    });
}
