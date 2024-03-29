export interface field {

    description: string
    type: string|string[2]
    textarea:textarea
    maxLength?: number
    max?: number
    min?: number
    requerid: boolean
    disable: boolean
    propertDto: string
    information?:string
    width:number
    formula?:string[]
    groupFormat?:string
    checkbox?:checkbox
    combo?:[],
    radio?:string[]
    value?: string
}

interface checkbox {
    on:string,
    off:string,
}
interface textarea {
    rows:number
    cols:number
}
