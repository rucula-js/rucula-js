import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
import { frame } from "../entities/form/frame";

@Injectable({
    providedIn: 'root',
})
export class FactoryObjectService{
    
    private Object:any = {};
    public JoinChield!:Array<KeyValue<string,string>> 
    public createObject(frames?:Array<frame>){
        frames?.forEach(frame => {
            if(frame.type == "block")
                this.Object[frame.objectDto] = {}
            if(frame.type == "line")
                this.Object[frame.objectDto] = [{}]
        });
    }

    public setPropertDto(propert:HTMLInputElement|HTMLSelectElement){
        let map =  propert.getAttribute("name")!.split(".")
        let type:string = map[0]
        let objectDto:string = map[1]
        let propertDto:string = map[2]
        let lineNumber:number = Number(map[3])

        switch(type){
            case "block":
                this.Object[objectDto][propertDto] = propert.value
                break;
            case "line":
                if(this.Object[objectDto][lineNumber] == undefined) this.Object[objectDto][lineNumber] = {}
                this.Object[objectDto][lineNumber][propertDto] = propert.value
                break;
            default:
                throw new Error("Rucula Error! Type Frame Incorrect");   
        }
    }
    public deleteLine(propert:HTMLInputElement|HTMLSelectElement){
        
        let map =  propert.getAttribute("name")!.split(".")
        let objectDto:string = map[1]
        let lineNumber:number = Number(map[3])
        delete this.Object[objectDto][lineNumber]
    }

    get object(){
        return this.PrepareObject()
    }
    private PrepareObject(){
        let formatedObject:any = Object.assign({},this.Object);
        this.JoinChield!.forEach(item => {
          let key = item.key
          let cheild = item.value;
          if(item.value != ""){
            formatedObject[key][cheild] = formatedObject[cheild]
            delete formatedObject[cheild]
          }
        })
        return formatedObject
    }
}