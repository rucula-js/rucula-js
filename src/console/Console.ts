import { ManagmentObject } from "../object/ObjectManagment";

export  class RuculaLogs {

    private managmentObject:ManagmentObject
    
    constructor(managmentObject:ManagmentObject) {
        this.managmentObject = managmentObject;
    }

    dependencies(){
        return  this.managmentObject.tableDependency.getDependenciesNotResolded();
    }
    object (){
        return this.managmentObject.objectFull()
    }  
    
}