export interface button{
    id:string
    method:string
    link?:string
    icon?:string
    text?:string
    type:string
    color?:string
    target:string
    urlrelative?:string
    params?:string
    headers?: object
    auth?:"none"|"basic"|"token"
}