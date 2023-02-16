import { button } from "./button";
import { quadro } from "./quadro";
import { table } from "./table";

export interface dynamicForm{
    tela:string,
    type:string,
    quadro?:Array<quadro>,
    columns?:table[]
    button:button[]
}