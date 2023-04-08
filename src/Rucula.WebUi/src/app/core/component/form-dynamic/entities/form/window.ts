import { KeyValue } from "@angular/common";
import { button } from "./button";
import { columnsGridGet } from "./columnsGridGet";
import { columnsGridjs } from "./columnsGridjs";
import { frame } from "./frame";

export interface window{
    tela:string,
    type:string,
    urlRoot:string
    urlGetAll:string
    urlGetId: string
    frames?:Array<frame>,
    columns:columnsGridjs[]
    button:button[]
    columnsGridGet:columnsGridGet[],
    joinChield:Array<KeyValue<string,string>>
}