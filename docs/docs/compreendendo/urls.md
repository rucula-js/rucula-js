# Url's 

No rucula-js a criação de url's é um processo dinâmico, que ocorre a partir da leitura de algumas propriedades presentes na configuração global, na janela e nos botões.

```js
{
    name: "Clientes",
    pathController: "Cliente", 👈
    type: "crud",
    grid:false,
    frames: []
    ...
}
```

```js
environments:[
    {
        env:"development",
        hostname:"http://localhost", 👈
        port: "5016" 👈
    }
]
```
```js
{
    URL:{
        absolute:string 👈
        relative:string, 👈
        params:string 👈
    }
}
```


## A URL Principal 

A URL principal usada por todas as janelas é criada a partir da configuração global `environments`, nela existe uma array de ambientes que dão suporte à todas as janelas.

Durante o processo de criação de url, o ruculs-js cria a URL principa padrão na seguinte forma `http://localhost:5016`


## Path Controller 

Normalmente temos janelas que fazem referência à um único caminho path, por exemplo, ao criar uma janela chamada `Ordem de Servico` é provável que o path de serviço utilizado pela janela seja `/OrdemServico` ou algo muito semelhante, o fato é que a janela terá os serviços que utiliza dentro de `/OrdemServico`. Complementado, podemos utilizar a propriedade `button.URL.params` para complementar a URL, como em casos **GET**.

Para esse caso a url seria criada utilizando a URL de domínio do ambiente atual, tendo o apoio do exemplo acima, teriamos uma url completa na seguinte forma: `http://localhost:5016/OrdemServico`

## Path Relativo no Contexto de Mesmo Ambiente

O path relativo de mesmo ambiente traz maior flexibilidade ao se fazer referencias a outros path's que estão presentes no mesmo ambiente.

Isso ocorre porque se informado em `button.URL.relative`, `pathController` será ignorado, o que garante ao desenvolvedor criar variações de URL's ao ambiente atual.

O Path Relativo tem o mesmo peso do `pathController`, entretanto, substitui o `pathController`. 

## Path Absoluto ou nova URL

Nesse modalidade de criação, toda configuração criada é ignorada e uma nova URL é criada. Para isso utilize a propriedade  `button.URL.absolute`.


O objetivo aqui é criar URL's que façam por exemplo referência a aplicações terceiras.

## Os Parametros de URL

Existem casos em que as URL's devem ser criadas com parametros, para esses casos o rucula-js lê as propriedade presente em `button.URL` e resolve a URL.

Com a url quase pronta  `http://localhost:5016/OrdemServico`, podemos passar os parametros em duas formas: 

### A Sintaxe dos Parametros

Para que a devida substituição entre propriedade do objeto seja feita, utilizamos duas sintaxes

1. `parametro={aliasFrame.namePropert}`. Caso tenha mais de um parametro, teriamos algo como `parametro={aliasFrame.namePropert}&parametro={aliasFrame2.namePropert2}`
    - `nome=reginaldo` 
2. `/{aliasFrame.namePropert}`. 
    - `/Cliente/234`

**Nota: A sintaxe de objeto propriedade {{objeto.propriedade}}, pode ser substituida por constantes, exemplo: `?id=12345` ou `/12345`**

Após a construção completa da url, teriamos `http://localhost:5016/OrdemServico?id=12345`, `http://localhost:5016/OrdemServico/12345`  ou outra URL absoluta.

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

