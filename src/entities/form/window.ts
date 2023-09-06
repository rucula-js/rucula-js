import { button } from "./button";
import { columnsGridGet } from "./columnsGridGet";
import { columnsGridjs } from "./columnsGridjs";
import { frame } from "./frame";

export interface window{
    name:string;
    type:string,
    pathController:string
    urlGetAll:string
    urlGetId: string
    frames:Array<frame>
    columns:columnsGridjs[]
    button:button[]
    columnsGridGet:columnsGridGet[],
    joinChield:{key:string, value:string}[]
}