import { columnsGrid } from '../entities/form/columnsGrid';
import { frame } from '../entities/form/frame';
import { RepresentationField } from '../entities/form/representationField';
import { window } from '../entities/form/window';

'use strict';

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
        },

        getTypeInput: function(rep: RepresentationField):string{

            let field = _window.frames.find(c => c.objectDto == rep.objectDto)?.fields?.find(c => c.propertDto == rep.propertDto) 
        
            if(Array.isArray(field?.type)){
                return field?.type[1]; 
            }
            return field!.type; 
        },

        getColumnsGrid: function ():columnsGrid[]{
            return _window.columnsGrid
        },
        
        getParamsGrid: function():string{
            return _window.paramsGrid
        }
    }
})()