# O que é o Rucula? 
Rucula é um sistema de gerenciamento de conteudo prático, que manipula a criação de conteudos para a web. Seu objetivo principal é mapear estruturas **HTML/CSS** à uma sintaxe de modelo em formato de função que juntos transformam um simples documento na sintaxe .ruc em páginas web padronizadas e formatadas.

## A sintaxe .ruc

Criada em formato de função, a sintaxe ruc é composta pelo nome da função (identificador), parametros (características) e chaves (representação - texto).

```
A(){
}
```
* A - Identificador
* ( ) - Características
* { } - texto representativo

Vejamos um exemplo de um título que será convertido:
```
H(C=red){
    Introdução ao docwrite
}
```
```
<h1 color="red;">Introdução ao docwrite<\h1>
```
## Pendências
- [X] rotina cadastro sintaxe rula
- [ ] rotina cadastro atributos
- [X] rotina conversor
- [ ] Tela usuário
- [ ] Tela login
