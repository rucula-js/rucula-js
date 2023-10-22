import { events } from '../entities/form/events';
import { window } from '../entities/form/window';

'use strict';

let _window:window;

export  function setWindow(window:window){
    if(_window) return;
    _window = window;
}
export function getWindow(){
    return _window;
}

export function getEvent(event:string):events{

    let evt = _window.events.find(ev => ev.name == event)
    if(evt){
        return evt;
    }
    throw new Error("Rucula - Evento não existe");
}