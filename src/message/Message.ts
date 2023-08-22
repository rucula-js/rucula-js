function  messageDangerRequerid(){
        createMessage("propriedade é obrigatoria")
}
function messageDangerMaxValue(){
    createMessage("Max Value")
}
function createMessage(mess:string){
    let messageForm = document.getElementById("message-form")
    messageForm!.classList.remove("d-none")
    let messsage = messageForm?.querySelector(".alert")
    messsage!.textContent = mess
    setTimeout(() => {
        messageForm?.classList.add("d-none")
    }, 2000);
}
export {
    messageDangerRequerid,
    messageDangerMaxValue
}
