import { Injectable } from "@angular/core";
import { ActionsHTTPService } from "./action-http.component.service";

@Injectable({
    providedIn:'root'
})
export class FactoryHttp{
    
    constructor(private actionHttp: ActionsHTTPService){}
    
    getById(url:string){
      let value:any;  
      this.actionHttp?.getById(url).subscribe((data:any) => value = data);  
      return value;
    }
    getAll(url:string){
      let value:any;  
      this.actionHttp?.getAll(url)
        .subscribe((data:any) => value = data);
        return value;
    }
    post(url:string="", data:any){
      this.actionHttp!.post(url,data)
          .subscribe({
              complete:() => {
              },
              error:(e) => {
              }
          }
      );
    }
    put(url:string="", data:any){
       this.actionHttp!.put(url,data)
      .subscribe({
          complete:() => {
          },
          error:(e) => {
          }
      })
    }
    delete(url:string="", options:any = {}){
      this.actionHttp!.delete(url,options).subscribe({
          complete:() => {
          },
          error:(e) => {
          }
      })
    }
}