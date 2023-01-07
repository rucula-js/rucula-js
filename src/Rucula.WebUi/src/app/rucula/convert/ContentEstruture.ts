import { ContentHTML } from "./ContentHTML"

export interface ContentEstruture {
    guuid:string,
    description:string,
    next: string,
    previous:string,
    contentHTMLDTO: ContentHTML
}
