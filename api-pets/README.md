# 🐾 API Pets - Gerenciamento de Adoções

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

API REST desenvolvida para gerenciamento de pets e tutores, permitindo
operações completas de CRUD (Create, Read, Update, Delete), com
validações inteligentes via middlewares e persistência em memória.

------------------------------------------------------------------------

## 📌 Visão Geral

Projeto estruturado com foco em organização, clareza arquitetural e
performance:

-   **Clean Code:** Validações otimizadas com loops de alto desempenho.
-   **Injeção de Dependência via Middleware:** Reaproveitamento de
    objetos encontrados em rotas com ID.
-   **Padronização:** Código formatado com Prettier.
-   **Padrão RESTful:** Uso semântico de métodos HTTP e códigos de
    status.

------------------------------------------------------------------------

## 🛠️ Stack Tecnológica

-   **Node.js**
-   **Express 5**
-   **CORS**
-   **Dotenv**
-   **Crypto (randomUUID)**
-   **Nodemon**
-   **Prettier**
-   **ES Modules (import/export)**

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

``` text
API-PETS/
├── src/
│   ├── index.js         # Ponto de entrada e rotas principais
│   ├── middleware.js    # Lógica de validação e interceptação
│   └── pets.js          # Mock de dados e lista de pets
├── .env                 # Variáveis de ambiente (porta, etc.)
├── .env.example         # Modelo para configuração do ambiente
├── .gitignore           # Arquivos ignorados pelo Git
├── .prettierrc          # Regras de formatação
└── package.json         # Dependências e scripts
```

------------------------------------------------------------------------

## 🚀 Instalação Local

``` bash
# Clone o repositório
git clone https://github.com/emersonpessoa01/api-pets

# Acesse a pasta
cd api-pets

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

Base URL padrão:

    http://localhost:3000

------------------------------------------------------------------------

## 📌 Endpoints

### 🔎 Listar Pets

``` http
GET /pets
```

### 🔍 Buscar Pet por ID

``` http
GET /pets/:id
```

### ➕ Criar Pet

``` http
POST /pets
```

Exemplo de body:

``` json
{
  "nome": "Thor",
  "idade": 3,
  "raca": "Labrador",
  "nomeTutor": "Carlos"
}
```

### ✏️ Atualizar Pet

``` http
PUT /pets/:id
```

### ❌ Remover Pet

``` http
DELETE /pets/:id
```

------------------------------------------------------------------------

## 🛡️ Middlewares de Destaque

### validarCamposPetsMiddlewares

Valida campos obrigatórios garantindo que nenhum valor seja enviado
vazio.\
Implementação otimizada utilizando filtragem em passada única para
melhor performance.

### verificarExistenciaPetMiddleware

Intercepta rotas dependentes de ID, valida existência do pet e injeta o
objeto `petEncontrado` na requisição, evitando buscas duplicadas.

------------------------------------------------------------------------

## 📈 Boas Práticas Aplicadas

-   Estrutura modular
-   Separação de responsabilidades
-   Reutilização via middlewares
-   Código padronizado
-   Uso de variáveis de ambiente

------------------------------------------------------------------------

## 🤝 Contribuição

1.  Fork o projeto
2.  Crie uma branch (`git checkout -b feature/minha-feature`)
3.  Commit suas alterações
4.  Push para sua branch
5.  Abra um Pull Request

------------------------------------------------------------------------

## 📄 Licença

Este projeto está sob a licença MIT.

------------------------------------------------------------------------

## 👨‍💻 Autor

**Instrutora:**\
@leticialeal

**Desenvolvido por:**\
Emerson Pessoa

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Emerson%20Pessoa-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/)\
[![GitHub](https://img.shields.io/badge/GitHub-emersonpessoa01-181717?logo=github&logoColor=white)](https://github.com/emersonpessoa01)

------------------------------------------------------------------------

🚀 Desenvolvedor em constante evolução.
