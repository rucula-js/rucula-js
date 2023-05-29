import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
import { frame } from "../entities/form/frame";
import { MessageFormService } from "../message/message-form.servive.component";

@Injectable({ 
    providedIn: 'root',
})
export class TableDependencyService{

    constructor(private Message:MessageFormService){}
   
    private tableDependency:Array<KeyValue<string,string>> = new Array();
    private Dependencies:Array<string> = new Array();
    private ElementInFocu!: HTMLElement;
    /*
     *  Fornece a estrutura para consistir o básico do que cada campo precisa
     *  O padrão  chave:valor 
     *      Cada chave segue a mesma estrutura criacional: valorObjeto.Chave.Linha
     *      Cada valor segue uma estrutura que muda com base nas dependencias
     *      exemplo 1 - chave = frame.id. valor = 1,2:10
     *          frame - Objeto
     *          id - propriedade
     *      descrendo a dependendia
     *          1 - Obrigatório
     *          2:10 - Deve ter no máximo 10 caracteres
     * 
     *      nota: Como não há linha, é possivel identificar que o frame é 1 - 1
     * 
     *      chave = frame.idade.10 valor = 1,2:18,3:150
     *      Acima temos um exemplo de uma idade que deve estar entre 12 e 150 e que não pode ser vazia
     *      descrendo a dependendia
     *      1 - idade deve ser obrigatória
     *      2:150 - idade deve ser maior que 150 
     *      3:18 -  idade não deve ser menor que 18
     * 
     *      nota: Como há linha uma linha de numero 10, é possivel identificar que o frame é 1 - *
    
     *      As Dependencias
     *      1 - Obrigatoriedade
     *      2 - Tamanho Máximo de Caracteres
     *      3 - Tamanho Máximo
     *      4 - Tamanho Minino
     *      5 - Expressão Regular
     * 
     *      Valores das Dependencias
     *      1
     *      2:[0-9]*
     *      3:[0-9]*
     *      4:[0-9]*
     *      5: qualquer expressão 
     * 
     * 
    */
    private REQUERID:string = "1" as const;
    private MAX_LENGHT:string = "2" as const;
    private MAX:string = "3" as const;
    private MIN:string = "4" as const;
    private DEPENDENCIES_AND_TODOIST_TAB:string = "." as const;

    public createTableDependency(frames:Array<frame>){
        frames.forEach(frame => 
            frame.fields!.forEach(field => {

                let keyDependency = ""      // terá o formato {frame.propriedade.} ou {frame.propriedade.linha}
                let valueDependency = "" 

                if(frame.type == "block")
                    keyDependency = this.keyDependency(frame.objectDto,field.propertDto!,"")

                if(frame.type == "line")
                    keyDependency = this.keyDependency(frame.objectDto,field.propertDto!,"0")

                valueDependency = this.valueDependency(field.requerid,Number(field.maxLength),Number(field.max),Number(field.min));
                this.tableDependency.push({key:keyDependency, value:valueDependency})
            })
        )
    }

    private keyDependency(frame:string,propert:string, line:string):string {                
        return `${frame}.${propert}.${line}`
    }

    private valueDependency(requerid:boolean, maxLength:number, max:number, min:number):string {                
        let valueDependency = ""

        if(requerid) valueDependency += `${this.REQUERID},`
        if(maxLength > 0) valueDependency += `${this.MAX_LENGHT}:${maxLength},`
        if(max > 0) valueDependency += `${this.MAX}:${max},`
        if(min > 0) valueDependency += `${this.MIN}:${min},`
        valueDependency += this.DEPENDENCIES_AND_TODOIST_TAB;  
        return valueDependency;
    }

    public setDependency(input:HTMLInputElement){
        this.ElementInFocu = input
        let split = input.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]
        let propert = split[2]
        let line = split[3]
        
        var key = ""
        if(type == "block") key = this.keyDependency(object,propert,"");
        if(type == "line") key = this.keyDependency(object,propert,line);

        var lineDependency = this.tableDependency.find(c => c.key == key)!;
        this.checkPropertDependency(lineDependency, input.value)

    }
    private checkPropertDependency(dependency:KeyValue<string,string>, value:string|number|boolean){

        let dependecies = dependency.value.split(".")[0]
        let todoist = dependency.value.split(".")[0]
        let resolved = dependency.value.split(".")[1]

        dependecies.split(",").forEach(d => {
            let option = d.split(":")[0]
            if(option == this.REQUERID){
                resolved = SetOrRemoveResolved(this.consistRequerid(value),this.REQUERID,resolved)
            }
            if(option == this.MAX_LENGHT){
                resolved = SetOrRemoveResolved(this.consistMaxLen(todoist,value),this.MAX_LENGHT,resolved)
            }
            
            function SetOrRemoveResolved(status:boolean, dependency:string, resolved:string ){
                if (status == true){
                    resolved = resolved.replace(dependency+",","")
                    resolved+=dependency+","
                }
                if (status == false){
                    resolved = resolved.replace(dependency+",","")
                }
                return resolved;
            }
        })
        dependency.value = `${todoist}.${resolved}`
    }
    private consistRequerid(value:string|number|boolean):boolean{
        
        if( value == undefined ||
            value as number == 0){
                this.Message.messageDangerRequerid()
                this.ElementInFocu.focus()
                return false;
        }
        return true;
    }

    private consistMaxLen(todoist:string,value:string|number|boolean){
        let max = this.getDependecy(todoist,this.MAX_LENGHT)
        if ((value as string).length > Number(max)){
            this.Message.messageDangerMaxValue()
            this.ElementInFocu.focus()
            return  false;
        }
        return true;
    }
    private getDependecy(todoist:string, dependecy:string){
        var dependecies = todoist.split(",") // [1,2:40,3:20,4:1]
        let result = dependecies.find( c=> c.split(":")[0] == dependecy)! // 2:40 -> [0] = 2, [1] = 40
        
        return result.split(":")[1] // 40
    }
    public createNewLine(propert:HTMLInputElement){
        
        let  split = propert.getAttribute("name")!.split(".")
        let frame:string = split[1]
        const LINE_NUMBER:string = "0"; // ! O numero da linha deve ser sempre 0, isso garante a obtenção das dependencias em um unico nivel de linha
        var dependecyes = this.tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_NUMBER);

        dependecyes.forEach(dependency => {
            let split = dependency.key.split("."); 
            let frame:string = split[0];
            let propert = split[1];
            let newKey = `${frame}.${propert}.${split[3]}`;
            let valueDependency = dependency.value.split(".")[0];

            this.tableDependency.push({
                key:newKey, 
                value:valueDependency
            })
        })
    }
}