import { Injectable, OnInit } from '@angular/core';
import windowGlobal from './window.global.json';
import { Enviroment } from './entities/Enviroments';
@Injectable({
  providedIn:'root',
})
export class GlobalWindowService implements OnInit {  
  private _environments: Enviroment[] = [];
  private _environment!: Enviroment;
  
  ngOnInit(): void {
  }

  preparaEnviroment(enviroment:string = "developmen"): void {
    this._environments = windowGlobal;
    this._environment = this._environments.find(c => c.env === enviroment)!;     
    console.log(this._environment)
  }

  get environment(){
    return this._environment;
  }
}