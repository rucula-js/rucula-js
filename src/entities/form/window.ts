import { button } from "./button";
import { columnsGridGet } from "./columnsGridGet";
import { columnsGridjs } from "./columnsGridjs";
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
    columns:columnsGridjs[]
    button:button[]
    columnsGridGet:columnsGridGet[],
    joinChield:{key:string, value:string}[]
    endPoints:endPoint[]
    
}