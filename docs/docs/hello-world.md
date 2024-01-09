Após a [configuração inicial](configuracao.md), é horá de iniciarmos uma janela `crud` bem simples. O intuito desse capítulo é fornecer uma ideia inicial do rucula-js.


**Nota: Não se preocupe com a configuração da janela, antente-se somente em ver o resultado final. Falaremos sobre cada configuração posteriormente**


```js
    let confHello = {
    "name": "Hello World",
    "pathController": "/HelloWorld",
    "type": "crud",
    "messageHome": "Hello  World",
    "iconHome": "bi-rocket-takeoff",
    "this": "hello",
    "frames": [
        {
        "name": "Header",
        "objectDto": "hello",
        "sequence": 0,
        "fields": [
            {
            "propertDto": "codigo",
            "description": "Código",
            "maxLength": 40,
            "width": 300,
            "sequence": 1,
            "value":"Hello world"
            }
        ]
        }
    ],
    "joinChield": [
    ],
    "endPoints": [
    ]
    }
```

Ao criar a configuração da janela, podemos passa-la para a nossa classe Rucula, a partir disso o rucula-js criará automáticamente uma interface em modelo `crud` pronta para uso.

```js
    let rucula = new Rucula(confHello,"js");
```
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

