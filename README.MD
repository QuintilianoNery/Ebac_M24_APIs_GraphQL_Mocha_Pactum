# Projeto de Testes com PactumJS

Este projeto implementa testes automatizados utilizando PactumJS, com o objetivo de realizar testes de API REST, API GraphQL e testes de contrato (Consumer-Driven Contract Testing) para garantir a qualidade e conformidade dos serviços.

## Pré-requisitos

- Node.js e NPM instalados.
- Docker e Docker Compose instalados.

## Configuração Inicial

1. **Inicialize o projeto Node.js**

```bash
   npm init -y
```

2. **Instale as dependências necessárias

```bash
    npm install
```

3. **Configure o Docker Compose Para subir os serviços de dependência, execute o comando:

```bash
    docker-compose up -d

```

## Executando os Testes

No package.json, os comandos de execução de testes são configurados para facilitar o processo de execução e análise dos resultados. Abaixo, você encontrará alguns exemplos de comandos de teste.

1. ** Testes de API REST

```bash
    npm run test:rest
```

2. **Testes de API GraphQL

```bash
    npm run test:gql
```

3. **Testes de Contrato do Provider 

```bash
    npm run test:contractProvider
```

4. **Testes de Contrato do Consumer 

```bash
    npm run test:contractConsumer
```
## Observando os Resultados dos Testes de Contrato

Após a execução dos testes de contrato, acesse a URL [http://localhost:8080/](http://localhost:8080/) para visualizar os relatórios e resultados detalhados dos testes realizados.