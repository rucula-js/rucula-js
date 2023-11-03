import { window } from "./entities/form/window";
import { createObject, setJoinChield } from "./object/ObjectManagment";
import { createTableDependency } from "./table-dependency/TableDependency";

import {createPanel,set}  from './console/Console'
import { createNameWindow, createWindowBase } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame } from "./const";
import { hiddenPopper } from "./popper/PopperEvent";
import { createLeftGrid } from "./tabulator/Tabulator";
import { createFrameBlock } from "./elements/frame/TypeBlock/FrameBlock";
import { createFrameLine } from "./elements/frame/TypeLine/FrameLine";
import { prepareButtons } from "./buttons/Button";
import { eventButton } from "./buttons/EventButton";
import { setWindow } from "./window/Window";


export class Rucula{
    
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    
    constructor(window:window, id:string = 'rucula-js'){
        
        this.window = window
        this.elementRucula = document.getElementById(id)!
        this.initWindow()
    }


    private initWindow(){
        
        setWindow(this.window);
        
        let panel = createPanel();
        this.elementRucula.appendChild(panel)


        createWindowBase(this.elementRucula.id);
        this.addHomeWindow();
        
        setJoinChield(this.window.joinChield);
        createObject(this.window.frames)
        createTableDependency(this.window.frames)
        createNameWindow(this.window.name)
        this.elementFormRucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        this.createFrames()
        hiddenPopper()
        set() 
        createLeftGrid();
        this.createButtons()
    }

    private addHomeWindow(){
     
        if(this.window?.iconHome){
            
            let icon = document.getElementById("r-f-home-icon")
            icon?.classList.add(this.window.iconHome)
        }

        if(this.window?.messageHome){
        
            let title = document.getElementById("r-f-home-title")
            title!.textContent = this.window?.messageHome
        }
    }
    
    private createButtons(type:string="CRUD"){

        if(type == "CRUD"){
            prepareButtons(this.window.button)
        }
        eventButton(this.window.button)
    }

    private createFrames(){
    
        this.window.frames?.forEach(frame => {
        
            if(frame.type == constTypeFrame.BLOCK){

                const block = createFrameBlock(frame)
                console.log(this.elementFormRucula)
                this.elementFormRucula.appendChild(block)
          
            }
    
            if(frame.type == constTypeFrame.LINE){
            
                const line = createFrameLine(frame)
                this.elementFormRucula.appendChild(line)
            
            }  
        })
    }
}



