import { campo } from "./campo";
import { line } from "./line";
export interface quadro{
    name: string,
    type: string,
    id: string,
    objectDto: string,
    child?: string,
    campo?:Array<campo>
    line?:Array<line>
}