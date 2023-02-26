export class openCloseFormDynamic{

    SetDomEvents(){
        document.getElementById("create-new")?.addEventListener('click',() => this.OpenFormDynamic())
    }
    OpenFormDynamic(){
        // (document.getElementById('form-dynamic') as HTMLFormElement).reset();
        const buttonClose = document.getElementById("close-dinamic-form");
        (buttonClose as HTMLButtonElement).style.display = "block";
        (buttonClose as HTMLButtonElement).addEventListener('click',() => this.CloseFormDynamic())
        document.getElementById("box-window")!.style.display = "flex"
    }
    CloseFormDynamic(){
        document.getElementById("close-dinamic-form")!.style.display = "none"
        document.getElementById("box-window")!.style.display = "none"
    }
}