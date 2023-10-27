import { button } from "./button";
import { columnsGrid } from "./columnsGrid";
import { endPoint } from "./endPoint";
import { frame } from "./frame";

export interface window{
    name:string;
    type:string;
    messageHome:string;
    iconHome:string;
    this:string;
    pathController:string;
    urlGetAll:string;
    urlGetId: string;
    frames:Array<frame>
    columnsGrid:columnsGrid[]
    paramsGrid:string
    button:button[]
    joinChield:{key:string, value:string}[]
    endPoints:endPoint[]
    
}