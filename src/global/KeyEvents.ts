let keyEvent:Array<string> = new Array<string>();

function KeyEventClear(){
    keyEvent = []
}
function KeyEventAdd(key:string){
    if(keyEvent.filter(c=> c == key).length == 0){
        keyEvent.push(key)
    }
    keyEvent.sort()
}
function KeyEventGetIndex(index:number){
    return keyEvent[index]
}

export {
    KeyEventAdd,
    KeyEventClear,
    KeyEventGetIndex
}
