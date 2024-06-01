export interface button{
    link?:string
    icon?:string
    text?:string
    type:string
    color?:string
    target:"r-a-save"|"r-a-alter"|"r-a-delete"|""
    URL:{
        absolute:string
        relative:string
        params:string
    },
    body:string,
    fullWidth:boolean,
    class?:string
}