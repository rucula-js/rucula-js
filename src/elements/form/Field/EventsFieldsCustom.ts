let eventsCustom: {key: string, value: Event }[] = []

export function setCustomEvent(eventCustom: {key: string, value: Event }){
    eventsCustom.push(eventCustom);
}

export function getCustomEvent(eventName:string){

    let result = eventsCustom.find( c=> c.key == eventName);
    
    if(result == null){
        throw new Error("event not found");
    }

    return result.value
}