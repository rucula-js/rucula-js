import { KeyValue } from "@angular/common";

export class factoryObjectService {

  private Maps!:Map<string,Array<KeyValue<string,Object>>> // Guarda todos os objetos que são unicos (tipo block).
  private MapsLine!:Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>  // Guarda todos os objetos que podem ter mais de uma linha (tipo line)
  /*  Quando um Objeto possui uma propriedade chield (do tipo objeto), é necessário
      passar para essa propriedade do tipo objeto, o objeto que foi mapeado em MapsChields */
  private MapsChields!:Array<KeyValue<string,string>>  
  
  public objJSON : any = {}; // Esse é o objeto principal construido 

  createObjet(){
    this.Maps = new Map<string,Array<KeyValue<string,Object>>>();
    this.MapsLine = new Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>();
    this.MapsChields = new Array<KeyValue<string,string>>();

    let form = document.getElementById("form-dynamic")

    let formData = new FormData(form as HTMLFormElement) // FormData é o que faz o trabalho de mapeamento ser mais simples. https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

    for (const inputValue of Object(formData).entries()) {

      /*
        Para que sejá possivel mepear corretamente os inputs de acordo com os objetsDto, os nomes dos inputs seguem o seguinte padrão:
        "tipoDoQuadro.ObjetoDto.Propiedade" ou "tipoDoQuadro.ObjetoDto.Propiedade.NumeroDaLinha"
        Esse padrão permite que as propiedades sejam mapeadas para seus respectivos objectsDtos 
      */
      let splitName = inputValue[0].split(".") 
      let valor = inputValue[1]
      let typeQuadro = splitName[0] 
      
      if (typeQuadro == "block"){
        // Padrão para esse tipo: "tipoDoQuadro.ObjetoDto.Propiedade" 
        this.PrepObjectTypeBlock(splitName,valor)
      } 
      if (typeQuadro == "line"){
        // Padrão para esse tipo: "tipoDoQuadro.ObjetoDto.Propiedade.NumeroDaLinha"
        this.PrepObjectTypeLine(splitName,valor)
      } 
    }
    
    this.mapToObjBlock(this.Maps)
    this.mapToObjArray(this.MapsLine)
    this.SetChields() 
    this.RemoveObjectDto()
  }
  private PrepObjectTypeBlock(splitName:string[], valor:any){

    let object:string = splitName[1]    
    let propert:string = splitName[2]   

    let objectMap = this.Maps.get(object)
    if (objectMap == undefined){ // se não existir o objeto mapeado
      this.Maps.set(object,new Array({key:propert,value:valor})) // um novo map para o objeto é criado
    }
    if (objectMap != undefined && propert == "chield"){
      valor.split(",").forEach((chield:string) => {
        this.Maps.get(object)?.push({key:chield,value:{}})
        this.MapsChields.push({key:object,value:chield})
      });
    }
    if (objectMap != undefined && propert != "chield"){

      this.Maps.get(object)?.push({key:propert,value:valor})
    }
  }
  private PrepObjectTypeLine(splitName:string[], valor:any){

    let object:string = splitName[1]    
    let propert:string = splitName[2]   
    let row:number = Number(splitName[3])   

    let objectMapDto = this.MapsLine.get(object)
    let objectMapRow = this.MapsLine.get(object)?.find(c => c.get(row))
    
    if (objectMapDto == undefined && objectMapRow == undefined){
      this.MapsLine.set(object,new Array(new Map().set(row,new Array({key:propert,value:valor}))))
    }
    if (objectMapDto != undefined && objectMapRow == undefined){
      this.MapsLine.get(object)?.push(new Map().set(row,new Array({key:propert,value:valor})))
    }
    if (objectMapDto != undefined && objectMapRow != undefined && propert == "chield"){
      valor.split(",").forEach((chield:string) => {
        objectMapDto?.find(c => c.get(row)?.push({key:chield,value:{}}))
        this.MapsChields.push({key:object,value:chield})
      });
    }
    if (objectMapDto != undefined && objectMapRow != undefined && propert != "chield"){
      objectMapDto?.find(c => c.get(row)?.push({key:propert,value:valor}))
    }
  }
  private mapToObjBlock(mapBlock:Map<string,Array<KeyValue<string,Object>>>) {

    let obj : any = {};

    mapBlock.forEach((objectValue, objectkey) => {
      objectValue.forEach(function(propert){
        obj[propert.key] = propert.value
      });
      this.objJSON[objectkey] = obj
      obj = {}
    });
    return this.objJSON;
  }
  private mapToObjArray(mapArray:Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>) {

    let objLine :Object[] = [];
    let obj : any = {};

    mapArray.forEach((obejctValue, obejctkey) => {
      obejctValue.forEach(function(rows, indexRow){
        rows.forEach(function(row, value){
          row.forEach(function(propert, value){
            obj[propert.key] = propert.value
          });  
          objLine.push(obj)
          obj = {}
        });  
      });
      this.objJSON[obejctkey] = objLine
      objLine = []
    });
  }
  private SetChields(){
    this.MapsChields.forEach(item => {
      if(item.value != ""){
        this.objJSON[item.key][item.value] = this.objJSON[item.value]
        delete this.objJSON[item.value]
      }
    })
  }

  private RemoveObjectDto(){
    // se a propriedade "cheild" do objectDto pai estiver vazio, é necessario remover o objetoDto que foi criado como vazio {"":{}}
    // "child": "",
    if (this.objJSON[""])
    this.objJSON = this.objJSON[""]
  }
}