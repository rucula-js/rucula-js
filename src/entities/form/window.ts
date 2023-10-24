import { button } from "./button";
import { columnsGrid } from "./columnsGrid";
import { endPoint } from "./endPoint";
import { frame } from "./frame";

export interface window{
    name:string;
    type:string;
    messageHome:string;
    iconHome:string;
    pathController:string;
    urlGetAll:string;
    urlGetId: string;
    frames:Array<frame>
    columnsGrid:columnsGrid[]
    button:button[]
    joinChield:{key:string, value:string}[]
    endPoints:endPoint[]
    
}