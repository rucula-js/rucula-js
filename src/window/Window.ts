import { frame } from '../entities/form/frame';
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
        }
    }
})()