# Pontos de Entrada

Os pontos de entrada configuram o modo em que as solicitações http serão feitas, cada um deles pode ser chamado por mais de um botão presente na janela do usuário. Quando o ponto de entrada é chamado, ele é usado como complemento para a biblioteca http padrão do rucula-js. Para saber mais, visite [Axios](https://axios-http.com/).


```javascript
export interface endPoint {
    name:string
    method:"post"|"put"|"get"
    urlrelative:string
    params:string
    body: string
}
```

|propriedade|descrição|
|-|-|
|`name`|também conhecido como id, a propriedade `name` é a identificação do ponto de entrada|
|`method`|indica  ao **Axios**, o tipo de solicitação http|
|`urlRelative`|complemento da url base, mais conhecido como path Controller. Para saber mais sobre o comportamento das Url's visite  a página [Url's](urls.md)|
|`params`|Parametros da Url. Para saber mais sobre o comportamento das Url's visite  a página [Url's](urls.md)|
|`body`|Objeto que será extraido da janela em foco. Para obtenção do objeto como um todo, o valor informado deve ser `this`|


<br>

##### Itens Relacionados

##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|

<a href="https://github.com/rucula-js/rucula-js">Contamos com a sua estrela 😀 - Visite o projeto rucula-js ⭐</a>

<div style="
    border: 2px solid #ff7906;
    border-radius: 8PX;
    padding: 8px;
    background-color: #ffeaea;
    ">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

