import { frame } from "../entities/form/frame";

'use strict';

let _object:any = {};
let _joinChield:{key:string, value:string}[] = []

function createObject(frames:Array<frame>){
    frames!.forEach(frame => {
        if(frame.type == "block")
        _object[frame.objectDto] = {}
        if(frame.type == "line")
        _object[frame.objectDto] = [{}]
    });
}
function joinChield(cheilds:{key:string, value:string}[] ){
   _joinChield = cheilds; 
   console.log(_joinChield)
}
function setPropertDto(propert:HTMLInputElement|HTMLSelectElement){
    let map =  propert.getAttribute("name")!.split(".")
    let type:string = map[0]
    let objectDto:string = map[1]
    let propertDto:string = map[2]
    let lineNumber:number = Number(map[3])

    switch(type){
        case "block":
            _object[objectDto][propertDto] = propert.value
            break;
        case "line":
            if(_object[objectDto][lineNumber] == undefined) _object[objectDto][lineNumber] = {}
            _object[objectDto][lineNumber][propertDto] = propert.value
            break;
        default:
            throw new Error("Rucula Error! Type Frame Incorrect");   
    }
}
function deleteLine(propert:HTMLInputElement|HTMLSelectElement){
    let map =  propert.getAttribute("name")!.split(".")
    let objectDto:string = map[1]
    let lineNumber:number = Number(map[3])
    delete _object[objectDto][lineNumber]
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
    return _object[object][propert]
}

export {
    createObject,
    setPropertDto,
    joinChield,
    object,
    getValuePropertTypeObject,
    deleteLine
}