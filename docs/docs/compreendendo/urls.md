# Url's 

No rucula-js a criação de url's é feita seguindo regras de prioridade. Isso ocorre porque o rucula tenta resolver dinamicamente grante parte das url's e com base no que está configurado na janela.

> Também podemos usar rucula.url() para gerenciar manualmente.


Atualmente o rucula tenta obter em dois locais a base para criação das url's, primeiramente ele tentará verificar o ambiente atual, depois tentará verificar se há configurão vinculada ao botão.


```js
// configuração do ambiente
environments:[
    {
        env:"development",
        hostname:"http://localhost", 👈
        port: "5016" 👈
    }
]
```
```js
// configuração da url(pode estar ou não vinculada ao botão)
{
    URL:{
        absolute:'www.novo.com/images?code={os.codigoImagem}' 👈
        relative:'OdemDeServico', 👈
        params:'?numero={os.codOS}' 👈
    }
}
```


## A URL Principal 

A URL principal é criada a partir da configuração global `environments`, nela existe uma array de ambientes que dão suporte à todas as janelas.

Durante o processo de criação de url, o ruculs-js cria a URL principal padrão na seguinte forma `http://localhost:5016`.

> Nota: Ela poderá ser substituida por outra url principal se `URL.absolute` for informada. De qualquer forma sempre haverá uma url principal. 

## Path Relativo

O path relativo é um complemento da url principal, ao ser informado o rucula concatena e retorna a nova url.

`http://localhost:5016/OdemDeServico`

## Os Parametros de URL

Existem casos em que as URL's devem ser criadas com parametros, para esses casos o rucula-js lê as propriedade presente em `URL.params` e resolve a URL.

`http://localhost:5016/OdemDeServico/?numero=2e82e892e`




### A Sintaxe dos Parametros

Para que a devida substituição entre propriedade do objeto seja feita, utilizamos duas sintaxes


1. `parametro={aliasFrame.namePropert}`. Caso tenha mais de um parametro, teriamos algo como `parametro={aliasFrame.namePropert}&parametro={aliasFrame2.namePropert2}`
2. `/{aliasFrame.namePropert}`. 

**Nota: A sintaxe de objeto propriedade {objeto.propriedade}, pode ser substituida por constantes, exemplo: `?id=12345` ou `/12345`**

Após a construção completa da url, teriamos `http://localhost:5016/OrdemServico?id=12345`, `http://localhost:5016/OrdemServico/12345`  ou outra URL absoluta.




## Path Absoluto ou nova URL

Nesse modalidade de criação, toda configuração criada é ignorada e uma nova URL é criada. Para isso utilize a propriedade  `button.URL.absolute`.
`www.novo.com/images?code=21wequweui`

O objetivo aqui é criar URL's que façam por exemplo referência a aplicações terceiras.
<br>

##### Itens Relacionados

<a href="https://github.com/rucula-js/rucula-js">⭐ Visite o projeto rucula-js ⭐</a>

<div class="rucula-info">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|

