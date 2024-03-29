import { window } from "./entities/form/window";
import { createObject, getObject, object, setJoinChield, setPropertDto } from "./object/ObjectManagment";
import { createTableDependency, setDependency } from "./table-dependency/TableDependency";
import {createPanel,set}  from './console/Console'
import { createNameWindow, createWindowBase } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame, eventRucula } from "./const";
import { hiddenPopper } from "./popper/PopperEvent";
import { createLeftGrid } from "./tabulator/Tabulator";
import { createFrameBlock } from "./elements/frame/TypeBlock/FrameBlock";
import { createFrameLine } from "./elements/frame/TypeLine/FrameLine";
import { prepareButtons } from "./buttons/Button";
import { eventButton, openCloseRightListButtons } from "./buttons/EventButton";
import { setWindow } from "./window/Window";
import { setDefault } from "./elements/Defaults";
import { RepresentationField } from "./entities/form/representationField";
import { configureLayout } from "./Layout/layout";
import { buttonsBase } from "./buttons/buttonsBaseCrud";

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
        
        setDefault(this.window)
        setWindow(this.window);
        
        let panel = createPanel();
        this.elementRucula.appendChild(panel);
        createWindowBase(this.elementRucula.id);
        this.addHomeWindow();
        setJoinChield(this.window.joinChield);
        createObject(this.window.frames)
        createTableDependency(this.window.frames)
        createNameWindow(this.window.name)
        this.elementFormRucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        configureLayout(this.window)
        this.createFrames()
        hiddenPopper()
        set() 
        createLeftGrid(this.window.grid);
        this.createButtons();
        buttonsBase.initButtonsTypeCrudDefault();
        buttonsBase.initButtonPlus();
        buttonsBase.buttonsTypeCrud.crud(this.window.crud);
        
        this.resetBackground()
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
        openCloseRightListButtons()
    }

    private createFrames(){
    
        this.window.frames?.forEach(frame => {

            if(frame.type == constTypeFrame.BLOCK){

                const block = createFrameBlock(frame)
                this.elementFormRucula.appendChild(block)
          
            }
    
            if(frame.type == constTypeFrame.LINE){
            
                const line = createFrameLine(frame)
                this.elementFormRucula.appendChild(line)
            
            }  
        })
    }

    private resetBackground(){

        let rucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)

        rucula?.addEventListener(eventRucula.RESET_BACKGROUND,() => {

            createObject(this.window.frames)
            createTableDependency(this.window.frames)

        })
    }

    public get(obj:string=""):any{
        
        if(obj == ""){
            return object();
        }
        
        return getObject(obj)
    }

    public set(rep:RepresentationField){
        
        let key  = `${rep.type}.${rep.objectDto}.${rep.propertDto}.${rep.lineNumber}`
        
        if(rep.lineNumber == undefined){
            key  = `${rep.type}.${rep.objectDto}.${rep.propertDto}`
        }
        
        let element = document.getElementsByName(key)[0] as HTMLInputElement
        
        element.focus()
        element.value = rep.value as string
        
        setPropertDto(rep)
        setDependency(rep)
        
        element.blur()
    }
}



