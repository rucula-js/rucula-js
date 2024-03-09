import { columnsGrid } from '../entities/form/columnsGrid';
import { endPoint } from '../entities/form/endPoint';
import { frame } from '../entities/form/frame';
import { RepresentationField } from '../entities/form/representationField';
import { window } from '../entities/form/window';

'use strict';

let _window:window;

export let configWindow = (() => {
    
    let _window:window;

    return {
        
        set:(window:window) => {
         
            if(_window){
                return;
            }
            _window = window;
        },
        
        get:()=> {
            return _window
        },

        frame: {
            get: (identity:string):frame => {
                return _window.frames.find(c=> c.identity == identity)!
            }
        },

        getEndPoint:(endPoint:string) => {
            
            let evt = _window.endPoints.find(ev => ev.name == endPoint)
            
            if(evt){
                return evt;
            }
            
            throw new Error("Rucula - Evento não existe");
        }
    }
})()

export  function setWindow(window:window){
    if(_window) return;
    _window = window;
}
export function getWindow(){
    return _window;
}

export function getThis(){
    return _window.this;
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

export function getParamsGrid():string{
    return _window.paramsGrid
}

export function getTypeInput(rep: RepresentationField):string{

    let field = _window.frames.find(c => c.objectDto == rep.objectDto)?.fields?.find(c => c.propertDto == rep.propertDto) 

    if(Array.isArray(field?.type)){
        return field?.type[1]; 
    }
    return field!.type; 
}