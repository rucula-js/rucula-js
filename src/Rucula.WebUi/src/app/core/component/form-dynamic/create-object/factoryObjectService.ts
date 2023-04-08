import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
import { formDynamicBaseService } from "../form-dynamic-base.component.service";

@Injectable({
  providedIn: 'root',
})
export class factoryObjectService {

  constructor(private formConfig?:formDynamicBaseService){}
  private Maps!:Map<string,Array<KeyValue<string,Object>>> // Guarda todos os objetos que são unicos (tipo block).
  private MapsLine!:Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>  // Guarda todos os objetos que podem ter mais de uma linha (tipo line)
  public objJSON : any = {}; // Esse é o objeto principal construido 

  createObjet(){
    this.Maps = new Map<string,Array<KeyValue<string,Object>>>();
    this.MapsLine = new Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>();
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
    this.MapChields()
    this.RemoveObjectDto()
  }
  private PrepObjectTypeBlock(splitName:string[], valor:any){

    let object:string = splitName[1]    
    let propert:string = splitName[2]   

    let objectMap = this.Maps.get(object)
    if (objectMap == undefined){ // se não existir o objeto mapeado
      this.Maps.set(object,new Array({key:propert,value:valor})) // um novo map para o objeto é criado
    }
    if (objectMap != undefined){
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
    if (objectMapDto != undefined && objectMapRow != undefined){
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
    this.formConfig?.JoinChield?.forEach(item => {
      let key = "";
      item.key == undefined ? key = "": key=item.key;
      let cheild = item.value;
      this.objJSON[key][cheild] = {};
    })
  }
  private MapChields(){
    this.formConfig?.JoinChield?.forEach(item => {
      let key = item.key == undefined ? "":item.key;
      let cheild = item.value;
      if(item.value != ""){
        this.objJSON[key][cheild] = this.objJSON[cheild]
        delete this.objJSON[cheild]
      }
    })
  }
  private RemoveObjectDto(){
    // se a propriedade "cheild" do objectDto pai estiver vazio, é necessario remover o objetoDto que foi criado como vazio {"":{}}
    // "child": "",
    if (this.objJSON[""])
    this.objJSON = this.objJSON[""]

    console.log(this.objJSON)
  }
}