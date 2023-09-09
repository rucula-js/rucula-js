export interface Configuration{
    method:string
    url:string
    data: object|any
    headers?:[key: string];
    auth?:string
}