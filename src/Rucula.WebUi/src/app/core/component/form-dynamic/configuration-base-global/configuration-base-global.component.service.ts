import { Injectable } from "@angular/core";
import { window } from "../entities/form/window";

@Injectable({
  providedIn: 'root',
})
export class ConfigurationBaseGlobalService{
  private _urlBase!:string
  private _windowName!:string
  private _urlGetAll:string = "" //! Renomear propriedade para pathGetAll
  private _urlGetById:string  = "" //! Renomear propriedade para pathGetById
  private _pathController:string  = ""

  set urlBase(url:string){
    if (url.length == 0){
      throw new Error("urlBase is requerid");
    }
    this._urlBase = url;
  }
  public get urlBase(){
    return this._urlBase;
  }
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
    this.urlBase = window.urlRoot;
    this.urlGetById = window.urlGetId;
    this.urlGetAll = window.urlGetAll;
  }
}