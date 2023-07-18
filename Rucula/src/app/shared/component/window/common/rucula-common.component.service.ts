import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class RuculaCommonService {
    resetForm(){
        let form = document.getElementById("form-dynamic") as HTMLFormElement;
        form.reset();
    }
}
 