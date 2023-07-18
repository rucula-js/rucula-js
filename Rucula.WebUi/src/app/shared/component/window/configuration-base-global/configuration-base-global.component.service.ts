import { Injectable } from "@angular/core";
import { window } from "../entities/form/window";

@Injectable({
  providedIn: 'root',
})
export class ConfigurationBaseGlobalService{
  private _windowName!:string
  private _urlGetAll:string = "" //! Renomear propriedade para pathGetAll
  private _urlGetById:string  = "" //! Renomear propriedade para pathGetById
  private _pathController:string  = ""


  private  set urlGetAll(url:string){
    this._urlGetAll = url;
  }
  get urlGetAll(){
    return this._urlGetAll;
  }
  get urlGetById(){
    return this._urlGetById;
  }
  private  set urlGetById(url:string){
    this._urlGetById = url;
  }
  get pathController(){
    return this._pathController;
  }
  private  set pathController(url:string){
    this._pathController = url;
  }
  setValues(window:window){
    this.urlGetById = window.urlGetId;
    this.urlGetAll = window.urlGetAll;
    this._pathController = window.pathController;
  }
}