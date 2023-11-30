import { DOT_DOT_SEPARATOR, constTypeFrame } from "../const";
import { frame } from "../entities/form/frame";
import { RepresentationField } from "../entities/form/representationField";

'use strict';

let _object:any = {};
let _joinChield:{key:string, value:string}[] = []

function createObject(frames:Array<frame>){
    
    _object = {}
    _object["zzRowCount"] = {} 
    
    frames?.forEach(frame => {
                
        if(frame.type == constTypeFrame.BLOCK){
            _object[frame.objectDto] = {}
        }

        if(frame.type == constTypeFrame.LINE){
            _object[frame.objectDto] = []
            _object["zzRowCount"][frame.objectDto] = -1
        }

    });
}
export function zeroNextzzRowCount(objectDto:string):number{
    return _object["zzRowCount"][objectDto] = -1;
}

function getNextzzRowCount(objectDto:string):number{
    return _object["zzRowCount"][objectDto] += 1;
}
function setPropertDto(rep:RepresentationField){

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
    //Todo melhorar parametro com tipo objeto
    
    if(line){
        let obj = (_object[object] as Array<any>).find(c => c.zzRowUi == line)
        return obj[propert]
    }    
    
    return _object[object][propert]
}

function sumPropert(objectPropert:string){
    
    const object = objectPropert.split('.')[0]
    const propert = objectPropert.split('.')[1]
    let sum = 0;
    let val = _object[object] as Array<any>
    
    for (let i = 0; i < val.length; i++){
        sum+=Number(val[i][propert]) 
    }    
    
    return sum;
}

function getMaxValue(rep:RepresentationField):number{
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
    delete formatedObject["zzRowCount"]
    const object = Object.values(formatedObject);
    if(object.length > 1){
        throw new Error ("Rucula - only one object should be returned !!!")
    }
    return object[0]
}
function setJoinChield(cheilds:string[] ){
    
    cheilds.forEach(item => {

        let join = item.split(DOT_DOT_SEPARATOR) 
        
        if(isUndefined()){
            throw new Error("JoinChield invalid")
        }

        _joinChield.push({key:join[0], value:join[1]}); 
                
        function isUndefined(){
            return join[0] == undefined || join[1] == undefined
        }
    })
 }

export {
    createObject,
    setPropertDto,
    setJoinChield,
    object,
    getValuePropertTypeObject,
    deleteLine,
    sumPropert,
    getMaxValue,
    getNextzzRowCount
}