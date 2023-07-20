import { ElementLink } from "./ElementLink";

describe('ElementLink',()=>{

    var elementButtom:ElementLink;

    beforeEach (() => elementButtom = new ElementLink())

    it('#Create buttom type link',function () {
        let buttom =  elementButtom.createElement(
            {
            id:"wnj3n",
            method:"",
            link:"https://www.google.com",
            icon:"",
            text:"doc",
            type:"link",
            color:"",
            target:""
        })  
        expect(buttom.outerHTML).toEqual('<a href="https://www.google.com" class="btn-link" target="_blank">doc<i></i></a>')        
    })
})