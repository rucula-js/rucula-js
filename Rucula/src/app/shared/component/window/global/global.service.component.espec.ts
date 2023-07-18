import { GlobalWindowService } from "./global.service.component";

describe('GlobalWindowService',() => {
    let service: GlobalWindowService;
    beforeEach(() => {new GlobalWindowService();});

    it('#should',() =>{
        service.ngOnInit();
        console.log(service.url);
        alert(15)
    })
})