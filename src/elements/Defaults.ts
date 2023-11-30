import { filter } from "mathjs";
import { constTypeFrame, constTypeInput } from "../const";
import { field } from "../entities/form/field";
import { frame } from "../entities/form/frame";
import { window } from "../entities/form/window";


const configFrameDefault = {
    TYPE_FRAME: constTypeFrame.BLOCK,
    VERTICAL: true
}

const configInputDefault = {
    TYPE: constTypeInput.TEXT,
    REQUERID_TRUE: true,
    REQUERID_FALSE: false,
    DISABLE: false
}


export function setDefaultWindow(window: window){
    
}

export function setDefaultFrame(frame: frame){
    
    frame.type ??= configFrameDefault.TYPE_FRAME
    frame.vertical ??= configFrameDefault.VERTICAL
}

export function setDefaultInput(field: field){

    field.type ??= configInputDefault.TYPE
    field.disable ??= configInputDefault.DISABLE
    
    if(field.type[0] == constTypeInput.CHECKBOX || field.type[0] == constTypeInput.RADIO){   
        field.requerid ??= configInputDefault.REQUERID_FALSE    
    }
    else{
        field.requerid ??= configInputDefault.REQUERID_TRUE
    }
    
}