import { button } from "./button";
import { quadro } from "./quadro";

export interface dynamicForm{
    tela:string,
    type:string,
    quadro?:Array<quadro>,
    columns:string[]
    button:button[]
}