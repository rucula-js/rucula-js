import { frame } from "../entities/form/frame";
import { representationField } from "../entities/form/representationField";

'use strict';

let _object:any = {};
let _joinChield:{key:string, value:string}[] = []

function createObject(frames:Array<frame>){
    frames!.forEach(frame => {
        if(frame.type == "block")
        _object[frame.objectDto] = {}
        if(frame.type == "line")
        _object[frame.objectDto] = []
    });
}

function joinChield(cheilds:{key:string, value:string}[] ){
   _joinChield = cheilds; 
}

function setPropertDto(rep:representationField){
    if(rep.lineNumber == null || rep.lineNumber == undefined){
        _object[rep.objectDto][rep.propertDto] = rep.value
    }
    else{
        let line = (_object[rep.objectDto] as Array<any>).findIndex(c => c.inUi == rep.lineNumber)
        if(line == -1){
            line = _object[rep.objectDto].length
            _object[rep.objectDto][line] = {inUi:rep.lineNumber}
        }
        _object[rep.objectDto][line][rep.propertDto] = rep.value
    }
}

function deleteLine(line:{objectDto:string, line:string}){ 
    let index = (_object[line.objectDto] as Array<any>).findIndex(c => c.inUi == line.line)
    _object[line.objectDto].splice(index,1)
}

function object(){
    return PrepareObject()
}

function PrepareObject(){
    let formatedObject:any = Object.assign({},_object);
    _joinChield?.forEach(item => {
        let key = item.key
        let cheild = item.value;
        if(item.value != ""){
        formatedObject[key][cheild] = formatedObject[cheild]
        delete formatedObject[cheild]
        }
    })
    return Object.values(formatedObject)[0]
}

function getValuePropertTypeObject(prop:string):any{
    const object = prop.split('.')[0]
    const propert = prop.split('.')[1]
    const line = prop.split('.')[2]
    if(line){
        return _object[object][line][propert]
    }    
    return _object[object][propert]
}

function sumPropert(objectPropert:string){
    const object = objectPropert.split('.')[0]
    const propert = objectPropert.split('.')[1]
    let sum = 0;
    let val = _object[object] as Array<any>
    for (let i = 0; i < val.length; i++)    
        sum+=Number(val[i][propert]) 
    return sum;
}

export {
    createObject,
    setPropertDto,
    joinChield,
    object,
    getValuePropertTypeObject,
    deleteLine,
    sumPropert
}