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
    REQUERID: true,
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
    field.requerid ??= configInputDefault.REQUERID
    field.disable ??= configInputDefault.DISABLE
    
}