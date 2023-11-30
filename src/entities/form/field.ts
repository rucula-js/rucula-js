export interface field {

    description: string
    type: string|string[2]
    checkbox?:checkbox
    textarea:textarea
    maxLength?: number
    max?: number
    min?: number
    requerid: boolean
    disable: boolean
    propertDto: string
    value?: string
    information?:string
    width:number
    formula?:string[]
    combo?:[],
    radio?:string[]
}
interface checkbox {
    on:string,
    off:string,
}
interface textarea {
    rows:number
    cols:number
}
