import { createButtonOrLinkService } from "./createButtonOrLink.service"

describe('createButtonOrLinkService',()=>{

    var btnService:createButtonOrLinkService;

    beforeEach (() => btnService = new createButtonOrLinkService())

    it('#Create Button Default',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"8418",
            method:"post",
            link:"",
            icon:"bi bi-save",
            text:"",
            type:"button",
            color:"",
            target:""
        })
        expect(buttonDOM.outerHTML).toEqual('<button class="btn mb-1" data-id="button-post-8418"><i class="bi bi-save"></i></button>')        
    })

    it('#Button Default contain Attribute data-id Contains "button"',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"8418",
            method:"post",
            link:"",
            icon:"bi bi-save",
            text:"",
            type:"button",
            color:"",
            target:""
        })
        expect(buttonDOM.outerHTML).toContain('data-id="button')        
    })
    it('#Button Default is html BUTTON',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"8418",
            method:"post",
            link:"",
            icon:"bi bi-save",
            text:"",
            type:"button",
            color:"",
            target:""
        })
        expect(buttonDOM.tagName).toEqual("BUTTON")       
    })
    it('#Create Link',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"777",
            method:"",
            link:"",
            icon:"",
            text:"documentation",
            type:"link",
            color:"",
            target:""
        })
        expect(buttonDOM.outerHTML).toEqual('<a href="" class="btn-link" target="_blank" data-id="link--777">documentation</a>')
    })
    it('#Button Link text is requerid',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"777",
            method:"",
            link:"",
            icon:"",
            text:"documentation",
            type:"link",
            color:"",
            target:""
        })
        expect(buttonDOM.innerText).toEqual('documentation')
    })
    it('#Button Link text contain value',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"777",
            method:"",
            link:"",
            icon:"",
            text:"documentation",
            type:"link",
            color:"",
            target:""
        })
        expect(buttonDOM.innerText.length > 0).toEqual(true);
    })

    it('#button Link contain atribute target="_blank"',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"777",
            method:"",
            link:"",
            icon:"",
            text:"documentation",
            type:"link",
            color:"",
            target:""
        })
        expect(buttonDOM.outerHTML).toContain('target="_blank"')
    })
    it('#button Link is html anchor',function () {
        let buttonDOM =  btnService.createButtonOrLink({
            id:"777",
            method:"",
            link:"",
            icon:"",
            text:"documentation",
            type:"link",
            color:"",
            target:""
        })
        expect(buttonDOM.tagName).toEqual("A")
    })
})