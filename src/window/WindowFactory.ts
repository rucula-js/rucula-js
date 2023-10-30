import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { button } from '../entities/form/button';
import { prepareButtons } from '../buttons/Button';
import { eventButton } from '../buttons/EventButton';
import * as consoleUi  from '../console/Console'
import {createTableDependency}  from '../table-dependency/TableDependency';
import {createObject,setJoinChield} from '../object/ObjectManagment';
import { setWindow } from './Window';
import { createFrameBlock } from '../elements/frame/TypeBlock/FrameBlock';
import { createFrameLine } from '../elements/frame/TypeLine/FrameLine';
import { hiddenPopper } from '../popper/PopperEvent';
import { clearContainer, createComponentCreateOrEdit, createWindowBase, createNameWindow } from '../elements/window-base/WindowBase';
import { createLeftGrid } from '../tabulator/Tabulator';

'use strict';

let _form:HTMLFormElement
let _windowConfiguration:window;

export function createWindow(windowConfiguration:window,idWindow:string = 'rucula-js'){

    let window = document.getElementById(idWindow);
    _windowConfiguration = windowConfiguration;
    let panel = consoleUi.createPanel();

    window?.appendChild(panel)
    createWindowBase(idWindow);
    createHome();
    createNameWindow(_windowConfiguration.name)
    createTableDependency(_windowConfiguration.frames)
    setJoinChield(_windowConfiguration.joinChield)  
    createObject(_windowConfiguration.frames)
    setWindow(_windowConfiguration);
    prepareEventsDefatult()
    hiddenPopper()
    consoleUi.set() 
    createLeftGrid();
}

function createFrames(frames:frame[]){
    
    frames?.forEach(frame => {
    
      if(frame.type == 'block'){
        const block = createFrameBlock(frame)
        _form.appendChild(block)
      }

      if(frame.type == 'line'){
        const line = createFrameLine(frame)
        _form.appendChild(line)
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

