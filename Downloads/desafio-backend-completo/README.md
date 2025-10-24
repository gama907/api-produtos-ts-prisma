# Desafio Backend - API de Produtos

API RESTful desenvolvida em Node.js com TypeScript, Express e Prisma, seguindo a arquitetura em camadas (Controller, Service, DTO) para gerenciar um catálogo de produtos. O banco de dados utilizado é o PostgreSQL, containerizado com Docker Compose para garantir um ambiente de desenvolvimento limpo e portátil.

## 🚀 Tecnologias Utilizadas

*   **Linguagem:** TypeScript
*   **Runtime:** Node.js
*   **Framework:** Express
*   **ORM:** Prisma
*   **Banco de Dados:** PostgreSQL
*   **Containerização:** Docker e Docker Compose
*   **Arquitetura:** Camadas (Controller, Service, DTO)

## 🛠️ Requisitos para Rodar

Você precisa ter o **Docker** e o **Docker Compose** instalados em sua máquina.

## ⚙️ Como Rodar Localmente

Siga os passos abaixo para iniciar a aplicação:

### 1. Clonar o Repositório

```bash
git clone [SEU_LINK_DO_REPOSITORIO]
cd desafio-backend
```

### 2. Configurar e Iniciar o Ambiente

O Docker Compose irá criar dois containers: `db` (PostgreSQL) e `app` (Node.js).

```bash
docker-compose up -d --build
```

### 3. Executar a Migração do Banco de Dados

Após o container do PostgreSQL estar ativo, execute a migração do Prisma para criar a tabela `Product`:

```bash
# O nome do container pode variar (ex: desafio-backend-app-1). 
# Verifique o nome exato com `docker ps` e substitua abaixo.
# Exemplo:
docker exec -it desafio-backend-app-1 npx prisma migrate dev --name init
```

### 4. Iniciar a Aplicação

A aplicação deve iniciar automaticamente. Se não, você pode forçar a reinicialização do container `app`:

```bash
docker-compose restart app
```

A API estará disponível em `http://localhost:3000`.

## 📍 Endpoints da API (CRUD de Produtos)

Todos os endpoints utilizam o prefixo `/api/produtos`.

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) | Resposta de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/produtos` | Lista todos os produtos. | N/A | `200 OK` + `ProductResponseDTO[]` |
| **GET** | `/api/produtos/{id}` | Busca um produto por ID. | N/A | `200 OK` + `ProductResponseDTO` |
| **POST** | `/api/produtos` | Cria um novo produto. | `{"name": "...", "price": 10.99, "category": "..."}` | `201 Created` + `ProductResponseDTO` |
| **PUT** | `/api/produtos/{id}` | Atualiza um produto existente. | `{"name": "Novo Nome", "price": 15.00}` | `200 OK` + `ProductResponseDTO` |
| **DELETE** | `/api/produtos/{id}` | Remove um produto. | N/A | `204 No Content` |

