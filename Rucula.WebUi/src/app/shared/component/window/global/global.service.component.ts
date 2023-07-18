import { Injectable, OnInit } from '@angular/core';
import { Environment } from '../util/Envirment';
import {Url} from '../util/url/Url';

@Injectable({
  providedIn:'root',
})

export class GlobalWindowService implements OnInit{  
  private _url!:Url;
  private _environment!: Environment;

  ngOnInit(): void {
      this.prepareUrl();
  }
  private prepareUrl(){
    const url = new URL(location.href);
    this._url.port = url.port;
    this._url.protocol = url.protocol;
  }
  get url(): Url {
    return this._url;
  }

  preparaEnviroment(enviroment:Environment): void {
    this._environment.enviroment = enviroment.enviroment;
    this._environment.description = enviroment.description;
   }

  get enviroment(): Environment {
    return this._environment;
  }
}