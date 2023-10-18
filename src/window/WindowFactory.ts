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
import { clearContainer, createComponentCreateOrEdit, createWindowBase } from '../elements/window-base/WindowBase';

'use strict';
let _form:HTMLFormElement
let _windowConfiguration:window;

export function createWindow(windowConfiguration:window,id:string = 'rucula-js'){
    
    _windowConfiguration = windowConfiguration;
    var window = document.getElementById(id);
    window?.appendChild(consoleUi.createPanel())
    createWindowBase(id);
    createHome();
    (window?.querySelector(".r-w-t") as HTMLElement).innerHTML = _windowConfiguration.name
    createTableDependency(_windowConfiguration.frames!)
    joinChield(_windowConfiguration.joinChield)  
    createObject(_windowConfiguration.frames)
    setWindow(_windowConfiguration);
    prepareEventsDefatult()
    setUrlrelativeInButtons(_windowConfiguration.button)
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

function prepareEventsDefatult(){
  let newDocument = document.getElementById("r-a-new")
  newDocument?.addEventListener("click", () => {
    createComponentCreateOrEdit()
    _form = document.getElementById("form-rucula-js") as HTMLFormElement; 
    createFrames(_windowConfiguration.frames)
    createButtons(_windowConfiguration.button)

    let cancel = document.getElementById("r-a-cancel")
    cancel?.addEventListener("click", () => {
      clearContainer()
      createHome()
    })
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

function createHome(){
    if(_windowConfiguration?.iconHome){
      let icon = document.getElementById("r-f-home-icon")
      icon?.classList.add(_windowConfiguration.iconHome)
    }

    if(_windowConfiguration?.messageHome){
      let title = document.getElementById("r-f-home-title")
      title!.textContent = _windowConfiguration?.messageHome
    }
}

