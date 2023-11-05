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




