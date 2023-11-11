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
