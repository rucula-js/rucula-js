import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class coreException{
    coreException(message:string,level:number) {
        return {   
            message: message,
            level:level
        }        
    }
}