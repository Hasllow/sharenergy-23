# Teste Full-Stack realizado pela empresa Sharenergy

> Status do Projeto: :heavy_check_mark:

### Tópicos

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

## Descrição do projeto

Neste README é descrito o passo-a-passo para executar a aplicação em ambiente, bem como as tecnologias utilizadas no mesmo.

### Front-End

No front-end foram utilizadas principalmente as bibliotecas React, e Material
UI. A interface conta com as seguintes telas:

- Tela inicial de login
- Tela que exibe usuários aleatórios populados através da API [Random User Generator](https://randomuser.me/)
- Tela com um campo para um código HTTP que ao ser preenchido exibe uma imagem recebida da API [HTTP Cat](https://http.cat/)
- Tela com botão de refresh que ao ser clicado exibe imagens e gifs da API [Random Dog](https://random.dog/)
- Tela com botão com botão para adicionar usuários, bem como a respectiva listagem dos mesmo cadastrados no banco de dados

### Back-End

O back-end foi construído em [Node](https://nodejs.org/en/), [Typescript](https://www.typescriptlang.org/), com o auxilio do framework [Express](https://expressjs.com/pt-br/).
Para o banco de dados onde foi realizada a persistência dos dados de usuário e dados de login foi escolhido [MongoDB](https://www.mongodb.com/docs/), e a conexão entre o banco de dados e o back-end foi realizada com [Prisma ORM](https://www.prisma.io/).

# Como executar a aplicação :arrow_forward:

## Front-End

Na pasta raiz do projeto (desafio-sharenergy-2023-01) execute o seguinte comandos no terminal:

```
cd /front
npm i
npm start
```

## Back-End

Na pasta raiz do projeto (desafio-sharenergy-2023-01) execute o seguinte comandos no terminal:

```
cd /back
npm i
npm start
```

## Tecnologias utilizadas :books:

Front-end

[React](https://reactjs.org/docs/getting-started.html)
| [Typescript](https://www.typescriptlang.org/)
| [Material Ui](https://mui.com/)

Back-end

[Node](https://nodejs.org/en/)
| [Typescript](https://www.typescriptlang.org/)
| [Express](https://expressjs.com/pt-br/)
| [MongoDB](https://www.mongodb.com/docs/)
| [Prisma ORM](https://www.prisma.io/)
