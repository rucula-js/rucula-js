import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class formDynamicBaseService {
  
  private _urlBase!:string
  private _urlGetAll:string = ""
  private _urlGetById:string  = ""
  private _joinChield!:Array<KeyValue<string,string>>
  

  set urlBase(url:string){
    if (url.length == 0){
      throw new Error("urlBase is requerid");
    }
    this._urlBase = url;
  }
  get urlBase(){
    return this._urlBase;
  }

  set urlGetAll(url:string){
    this._urlGetAll = url;
  }
  get urlGetAll(){
    return this._urlGetAll;
  }

  set urlGetById(url:string){
    this._urlGetById = url;
  }
  get urlGetById(){
    return this._urlGetById;
  }

  set JoinChield(joinChield:Array<KeyValue<string,string>>){
    this._joinChield = joinChield;
  }
  get JoinChield(){
    return this._joinChield;
  }

}