---
title: Introdução ao Rucula
summary: Primeira Apresentação do rucula-js
authors:
    - Reginald Marinho
date: 2023-09-15
---

<h1 align="center">Rucula-js - Gerando Janelas Dinamicamente</h1>
<p align="center">
  <img src="https://raw.githubusercontent.com/reginaldo-marinho/rucula-js/b76e809a44a66de3733e30388e29d672c8b61011/docs/assets/rucula.svg" style="width:200px">
</p>

Bem vindo ao projeto rucula-js, aqui você aprenderá a criar janelas e consumir API's Rest de uma forma mais rápida e mais consistente.  Esqueça o problema de ter que se preucupar em validar campos, efetuar cálculos matemáticos, criar e mapear objetos do tipo array e por ultimo o mais redundante, criar div's e mais div's para representar formularios que estão passiveis de erros e de falta de padronização.


## Os Níveis de Atuação do Rucula-js

O rucula funciona em três níveis, cada nivel representa um etapa e o limite do seu funcionamento

- **1° Nivel** Configuração global da aplicação - Aqui é configurado os ambientes e as localizações
- **2° Nivel** Criação e Configuração da Janela - Aqui se obtém todas estrura necessária para criação da Janela desejada
- **3° Nivel** Contrução da Jenela - Aqui o rucula-js lê as Configurações Globais e as Configurações da Janela e converte em uma interface de usuário amigavel
- **4° Nivel** - Criação e Controle dos Objetos - Com base nos eventos da Janela o Rucula-js cria e valida objetos dinamicamente até o objeto estar 100% em conformidade com as configurações passadas. Para seber mais visite [Conceitos Rucula](./conceitos.md).

**Após a criação e validação do 4° nível, o rucula-js estará pronto para consumir suas API's🚀**

