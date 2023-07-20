import { ElementButton } from "./ElementButton";

describe('ElementButton',()=>{

    var elementButton:ElementButton;

    beforeEach (() => elementButton = new ElementButton())

    it('#Create Button type button',function () {
        let buttonDOM =  elementButton.createElement({
            id:"8418",
            method:"post",
            link:"",
            icon:"bi bi-save",
            text:"",
            type:"button",
            color:"",
            target:""
        })
        expect(buttonDOM.outerHTML).toEqual('<button class="btn mb-1 d-block" data-id="button-post-8418"><i class="bi bi-save"></i></button>')        
    })
})