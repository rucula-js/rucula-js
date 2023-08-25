import { suportline } from "../../entities/grid-line/suportline";

'use strict';

let  suportLine:suportline[] = [];

export function setLine(line:suportline){
    let findLine = suportLine.find(c=> c.objectDto == line.objectDto);

    if(findLine == undefined){
        suportLine.push(line);
        return;
    }
    let index = suportLine.indexOf(findLine)
    suportLine.splice(index,1);
    suportLine.push(line)
}
export function getLine(objectDto:string): suportline|undefined {
    let findLine = suportLine.find(c=> c.objectDto == objectDto);
    return findLine;
}
export function CountIsZero(objectDto:string): boolean {
    let length = suportLine.filter(c=> c.objectDto == objectDto).length
    return length == 0;
}
export function SetZero(objectDto:string){
    let object = suportLine.find(c=> c.objectDto == objectDto)
    let index = suportLine.indexOf(object!);
    suportLine.splice(index, 1);
}
