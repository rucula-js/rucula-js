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


function setDefaultWindow(window: window){
    
}

function setDefaultFrame(frame: frame){
    
    frame.type ??= configFrameDefault.TYPE_FRAME
    frame.vertical ??= configFrameDefault.VERTICAL
}

function setDefaultInput(field: field){
        
    field.type ??= configInputDefault.TYPE
    field.disable ??= configInputDefault.DISABLE
    field.requerid ??= configInputDefault.REQUERID_FALSE 
}

export function setDefault(window: window){
    window.frames.forEach(frame => {

        setDefaultFrame(frame)

        frame.fields?.forEach(field => {
            setDefaultInput(field)
        })

    })
}