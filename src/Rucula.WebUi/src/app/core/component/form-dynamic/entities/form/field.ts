export interface field{
    id: string
    description: string
    type: string,
    combo?:[]
    maxLength?: number
    max?: number
    min?: number
    required: boolean
    disable: boolean
    propertDto?: string
    value?: number|string|boolean|Date
    information?:string
}