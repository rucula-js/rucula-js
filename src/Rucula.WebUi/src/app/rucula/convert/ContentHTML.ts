import { TagMetaHTML } from "./TagMetaHTML"

export interface ContentHTML {
    guuid?:string,
    content?: string,
    contentLanguageRucula?:string
    tagMetaHTML?:TagMetaHTML[]
}
