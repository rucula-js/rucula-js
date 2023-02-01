import { coreException } from "./exeptions/coreExeption";

import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class fieldValidService {

    constructor(private coreException?:coreException){}
    
    public checkMaxLen(propertDescription:string,value:string, valueMax:number){
        if ( value.length > valueMax)
            throw this.coreException!.coreException(
                `${propertDescription} não deve conter mais de ${valueMax} caracteres`,1);
    }
    public checkMinLen(propertDescription:string,value:string, valueMin:number){
        if ( value.length < valueMin)
            throw this.coreException!.coreException(
                `${propertDescription} deve ter no mínimo ${valueMin} caracteres`,1);
    }
    public checkIsRequerid(propertDescription:string,value:string){
        if ( value.length <= 0)
            throw this.coreException!.coreException(
                `${propertDescription} é obrigatório`,1);
    }
}