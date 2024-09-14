# Restaurant Menu

Este é um projeto de menu de restaurante construído com React, TypeScript e Vite. O projeto inclui funcionalidades de Internacionalização de textos, Internacionalização por dinheiro, roteamento e estilização com Styled Components.

## Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts](#scripts)
- [Executando o Projeto](#executando-o-projeto)
- [Deploy](#deploy)


## Visão Geral

Este projeto é um menu de restaurante que permite visualizar e interagir com itens de menu. É construído usando [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), e [Vite](https://vitejs.dev/) para um desenvolvimento rápido e eficiente.

## Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (recomendado versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/FernandoAlmeida1/restaurant-menu.git  

2. Navegue para o diretório do projeto:

    ```bash
    cd restaurant-menu

3. Instale as dependências:
    
    ```bash
    npm install

## Scripts

Aqui estão os scripts disponíveis para gerenciar o projeto:

  dev: Inicia o servidor de desenvolvimento. Acesse http://localhost:5174/restaurant-menu/ no seu navegador.
    
    
    npm run dev

  build: Compila o projeto para produção. A build será gerada no diretório dist.
    
    
    npm run build

  lint: Executa a verificação de linting no código.
    
    
    npm run lint

  preview: Visualiza a build de produção localmente.
    
    
    npm run preview

  test: Executa os testes usando Jest.
    
    
    npm run test  

  predeploy: Executa a build do projeto antes do deploy.
    
    
    npm run predeploy

  deploy: Publica a build no GitHub Pages.
    
    
    npm run deploy

## Executando o Projeto

  Para iniciar o projeto localmente, use o comando:
    
    
    npm run dev

  Acesse o projeto no navegador através de:
    http://localhost:5173/restaurant-menu/

## Deploy

  Para publicar o projeto no GitHub Pages, siga estes passos:

1. Certifique-se de que o diretório dist é gerado corretamente com npm run build.

2. Adicione a configuração base no arquivo vite.config.ts:

      ```bash
      import { defineConfig } from 'vite';
      export default defineConfig({
        base: '/restaurant-menu/',
      });

3. Execute o comando de deploy:
      
      ```bash
      npm run deploy
    
  O projeto será publicado em:
    https://fernandoalmeida1.github.io/restaurant-menu/

