import { Injectable } from "@angular/core";
import { frame } from "../entities/form/frame";

@Injectable({
    providedIn: 'root',
})
export class FactoryObjectService{
    
    private object:any = {};
    
    public createObject(frames?:Array<frame>){
        frames?.forEach(frame => {
            if(frame.type == "block")
                this.object[frame.objectDto] = {}
            if(frame.type == "line")
                this.object[frame.objectDto] = [{}]
        });
    }
    public setPropertDto(propert:HTMLInputElement){

        let map =  propert.getAttribute("name")!.split(".")
        let type:string = map[0]
        let objectDto:string = map[1]
        let propertDto:string = map[2]
        let lineNumber:number = Number(map[3])

        switch(type){
            case "block":
                this.object[objectDto][propertDto] = propert.value
                break;
            case "line":
                if(this.object[objectDto][lineNumber] == undefined) this.object[objectDto][lineNumber] = {}
                this.object[objectDto][lineNumber][propertDto] = propert.value
                break;
            default:
                throw new Error("Rucula Error! Type Frame Incorrect");   
        }
        console.log(this.object)
    }
}