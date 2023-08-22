import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { button } from '../entities/form/button';
import { prepareButtons } from '../buttons/Button';
import { eventButton } from '../buttons/EventButton';
import * as consoleUi  from '../console/Console'
import {createTableDependency}  from '../table-dependency/TableDependency';
import {createObject,joinChield} from '../object/ObjectManagment';
import { setWindow } from './Window';
import { createFrameBlock } from '../elements/frame/TypeBlock/FrameBlock';
import { createFrameLine } from '../elements/frame/TypeLine/FrameLine';
import { hiddenPopper } from '../popper/PopperEvent';

'use strict';

let _form = document.getElementById('form-dynamic') as HTMLFormElement;        
export function domCreateForm(windowConfiguration:window){
    createTableDependency(windowConfiguration.frames!)
    joinChield(windowConfiguration.joinChield)  
    createObject(windowConfiguration.frames)
    setWindow(windowConfiguration);
    createFrames(windowConfiguration.frames)
    setUrlrelativeInButtons(windowConfiguration.button)
    createButtons(windowConfiguration.button)
    hiddenPopper()
    consoleUi.set() 
}
function createFrames(frames:frame[]){
    frames?.forEach(frame => {
    switch (frame.type) {
      case 'block':
        const block = createFrameBlock(frame)
        _form.appendChild(block)
        break;
      case 'line':
        const line = createFrameLine(frame)
        _form.appendChild(line)
          break;
      default:
        throw new Error(`Frame type "${frame.type}" is not allowed`); 
    }
  })
}
function createButtons(buttons:button[],type:string="CRUD"){
    if(type == "CRUD"){
        prepareButtons(buttons)
    }
    eventButton(buttons)
}
function setUrlrelativeInButtons(buttons:button[],pathController:string = ""){
    buttons.map(b => {
        if(b.urlrelative == null || b.urlrelative == "") b.urlrelative = pathController;
    })
}

