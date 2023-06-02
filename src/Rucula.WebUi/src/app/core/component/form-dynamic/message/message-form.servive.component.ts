import { Injectable } from "@angular/core";

@Injectable({ 
    providedIn: 'root',
})
export class MessageFormService{
   
    public messageDangerRequerid(){
        this.createMessage("propriedade é obrigatoria")
    }
    public messageDangerMaxValue(){
        this.createMessage("Max Value")
    }

    private createMessage(mess:string){
        let messageForm = document.getElementById("message-form")
        messageForm!.classList.remove("d-none")
        let messsage = messageForm?.querySelector(".alert")
        messsage!.textContent = mess
        setTimeout(() => {
            messageForm?.classList.add("d-none")
        }, 2000);
    }
}