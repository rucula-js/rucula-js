import { field } from "./field";
import { line } from "./line";
export interface frame{
    
    name: string
    type: string
    parent: string
    objectDto: string
    alias:string
    identity:string
    vertical:boolean
    sequence:number
    fields?:Array<field>
    line?:Array<line>
    layout: {col:{start:number, end:number}, row: {start:number, end:number}}
    
}