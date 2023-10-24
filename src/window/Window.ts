import { columnsGrid } from '../entities/form/columnsGrid';
import { endPoint } from '../entities/form/endPoint';
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

export function getEndPoint(endPoint:string):endPoint{

    let evt = _window.endPoints.find(ev => ev.name == endPoint)
    if(evt){
        return evt;
    }
    throw new Error("Rucula - Evento não existe");
}

export function getColumnsGrid():columnsGrid[]{
    return _window.columnsGrid
}