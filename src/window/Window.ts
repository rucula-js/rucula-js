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