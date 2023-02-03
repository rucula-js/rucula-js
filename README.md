
![rucula](https://user-images.githubusercontent.com/60780631/209857688-64dcd253-aeb6-44fc-bf75-82ce711343cd.jpeg)


# O que é o Rucula? 
Rucula é um sistema de gerenciamento de conteudo prático, que manipula a criação de conteudos para a web. Seu objetivo principal é mapear estruturas **HTML/CSS** à uma sintaxe de modelo em formato de função que juntos transformam um simples documento na sintaxe .ruc em páginas web padronizadas e formatadas.

## A sintaxe Rucula

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

## Qual a vantagem de utilizar a linguagem Rúcula?
A vantagem da línguagem está a facilidade de criar componentes complexos e vincula-los em apenas uma representação rúcula. Vejamos exemplo:
```
<div class="alert alert-primary d-flex align-items-center" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
  <div>
    An example alert with an icon
  </div>
</div>
```
Poderíamos representar essa caixa de atenção da seguinte maneira:
```
ATENCAO(){   
    An example alert with an icon
}
```
## Pendências
- [X] rotina  sintaxe Rucula
- [ ] rotina  Atributos
- [X] rotina conversor
- [ ] usuários
- [ ] login
- [ ] e-mails
- [ ] Menu


- [ ] Formulários Dinâmicos
- [ ] NavBar



Tecnologias
- Angular
- .NET 6
- PostgreSQL
