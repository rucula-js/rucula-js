# O Terminal

Desenvolver e observar o que o rucula faz por baixo dos panos pode ser um pouco confuso no começo, mas para reduzir ao maxímo essa possivel situação, estamos desenvolvendo o terminal do rucula, como ele você digitar alguns comandos e ter informações valiosas.

## Comandos contidos no Terminal

|comando|objetivo|
|--|--|
|`ruc --dep`| Retorna todas as dependências que estão em aberto na tela do usuário.|
|`ruc --obj`| Retorna o objeto que está sendo construido durante a utilização da tela do usuário.|
|`clear` ou `-c`| Limpa as informações presentes no Terminal|

**OBSERVAÇÃO IMPORTANTE: É com base nas dependências que o rucula sabe se o objeto que está sendo criado, está em perfeitas condições para ser utilizado para outros fins, como por exemplo: Um envio `post` para uma API de terceiro.**
