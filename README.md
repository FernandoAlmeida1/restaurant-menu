# Restaurant Menu

This is a restaurant menu project built with React, TypeScript, and Vite. The project includes text internationalization, currency internationalization, routing, and styling with Styled Components.

## Índice

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts](#scripts)
- [Running the Project](#Running the Project)
- [Deploy](#deploy)


## Overview

This project is a restaurant menu that allows you to view and interact with menu items. It is built [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/) for fast and efficient development.

## Prerequisites

Before you start, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (recommended version 16 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FernandoAlmeida1/restaurant-menu.git  

2. Navigate to the project directory:

    ```bash
    cd restaurant-menu

3. Install the dependencies:
    
    ```bash
    npm install

## Scripts

Here are the available scripts for managing the project:

  dev: Starts the development server. Access http://localhost:5174/restaurant-menu/ in your
    
    
    npm run dev

  build: Compiles the project for production. The build will be generated in the dist directory.
    
    
    npm run build

  lint: Runs linting checks on the code.
    
    
    npm run lint

  preview: Views the production build locally.
    
    
    npm run preview

  test: Runs tests using Jest.
    
    
    npm run test  

  predeploy: Runs the project build before deploying.
    
    
    npm run predeploy

  deploy: Publishes the build to GitHub Pages.
    
    
    npm run deploy

## Running the Project

  To start the project locally, use the command:
    
    
    npm run dev

  Access the project in your browser at:
    http://localhost:5173/restaurant-menu/

## Deploy

  To publish the project on GitHub Pages, follow these steps:

1. Make sure the dist directory is correctly generated with npm run build.

2. Add the base configuration in the vite.config.ts file:

      ```bash
      import { defineConfig } from 'vite';
      export default defineConfig({
        base: '/restaurant-menu/',
      });

3. Run the deploy command:
      
      ```bash
      npm run deploy
    
  The project will be published at
    https://fernandoalmeida1.github.io/restaurant-menu/

