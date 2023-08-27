import { frame } from "../entities/form/frame";
import { representationField } from "../entities/form/representationField";

'use strict';

let _object:any = {};
let _joinChield:{key:string, value:string}[] = []

function createObject(frames:Array<frame>){
    _object["zzRowCount"] = {} 
    frames!.forEach(frame => {
        if(frame.type == "block"){
            _object[frame.objectDto] = {}
        }
        if(frame.type == "line"){
            _object[frame.objectDto] = []
            _object["zzRowCount"][frame.objectDto] = -1
        }
    });
}

function getNextzzRowCount(objectDto:string):number{
    return _object["zzRowCount"][objectDto] += 1;
}

function setPropertDto(rep:representationField){
    if(rep.lineNumber == null || rep.lineNumber == undefined){
        _object[rep.objectDto][rep.propertDto] = rep.value
    }
    else{
        let line = (_object[rep.objectDto] as Array<any>).findIndex(c => c.zzRowUi == rep.lineNumber)
        if(line == -1){
            line = _object[rep.objectDto].length
            _object[rep.objectDto][line] = {zzRowUi:rep.lineNumber}       
        }
        _object[rep.objectDto][line][rep.propertDto] = rep.value
    }
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

function getMaxValue(rep:representationField):number{
    const VALOR_ULTIMA_LINHA_ADICIONADA_NO_OBJETO = '';
    if(rep.lineNumber == null || rep.lineNumber == undefined){
        throw new Error("Rucula - lineNumber is Required")
    }
    let object = (_object[rep.objectDto] as Array<any>);
    if(object.length == 0){
        return 0;
    }
    if(object.length == 1){
        return parseInt(object[0][rep.propertDto]+0)
        //? Caso a unica linha seja vazia '', é somado com zero assim, ''+0 = 0
    }
    let maxValue = object.filter(c=> c[rep.propertDto] != VALOR_ULTIMA_LINHA_ADICIONADA_NO_OBJETO).sort(c=> c[rep.propertDto])
    .reverse()[0]
    return parseInt(maxValue[rep.propertDto])    
}

function deleteLine(line:{objectDto:string, line:string}){ 
    let index = (_object[line.objectDto] as Array<any>).findIndex(c => c.zzRowUi == line.line)
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
    return Object.values(formatedObject)
}

function joinChield(cheilds:{key:string, value:string}[] ){
    _joinChield = cheilds; 
 }

export {
    createObject,
    setPropertDto,
    joinChield,
    object,
    getValuePropertTypeObject,
    deleteLine,
    sumPropert,
    getMaxValue,
    getNextzzRowCount
}