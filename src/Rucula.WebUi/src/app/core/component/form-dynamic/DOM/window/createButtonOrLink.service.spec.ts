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

    it('#Create Link Default',function () {
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
})