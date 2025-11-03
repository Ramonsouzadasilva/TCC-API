# RESTful API - Testes para o TCC

API RESTful construída com TypeScript, Express, Prisma, seguindo os princípios de Clean Architecture e SOLID.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **Zod** - Validação
- **Docker** - Containerização

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:

   npm install

3. Configure as variáveis de ambiente:
   .env

4. Inicie o PostgreSQL com Docker:
   pnpm run docker:up

## Executando

### Desenvolvimento

pnpm run dev

## API Endpoints

### Empresas

- `POST /api/empresas` - Criar empresa
- `GET /api/empresas` - Listar empresas
- `GET /api/empresas/:id` - Buscar empresa
- `PUT /api/empresas/:id` - Atualizar empresa
- `DELETE /api/empresas/:id` - Deletar empresa

### Funcionários

- `POST /api/funcionarios` - Criar funcionário
- `GET /api/funcionarios` - Listar funcionários
- `GET /api/funcionarios/:id` - Buscar funcionário
- `GET /api/funcionarios?empresaId=:id` - Listar por empresa

### Projetos

- `POST /api/projetos` - Criar projeto
- `GET /api/projetos` - Listar projetos
- `GET /api/projetos?empresaId=:id` - Listar por empresa

### URLs

- `POST /api/urls` - Criar URL

### Health Check

- `GET /api/health` - Status da API

## Princípios Aplicados

### Clean Architecture

- Separação em camadas (Domain, Application, Infrastructure, Presentation)
- Dependências apontam para dentro (Domain é independente)
- Regras de negócio isoladas

### SOLID

- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Interfaces bem definidas
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Dependência de abstrações

### Boas Práticas

- DTOs para entrada e saída
- Validação com Zod
- Tratamento de erros centralizado
- Repository Pattern
- Dependency Injection via Factories
- Singleton para Prisma Client

# Iniciar containers

pnpm run docker:up

# Parar containers

pnpm run docker:down
