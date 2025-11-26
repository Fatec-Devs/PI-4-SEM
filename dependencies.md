# Dependências do Projeto

## Backend (NestJS)

### Dependências Principais
- `@nestjs/common` - Core do NestJS
- `@nestjs/core` - Core do NestJS
- `@nestjs/platform-express` - Suporte para Express
- `@nestjs/testing` - Módulo de testes
- `reflect-metadata` - Necessário para decorators
- `rxjs` - Biblioteca para programação reativa

### Dependências de Desenvolvimento
- `typescript` - Suporte para TypeScript
- `ts-node` - Execução de TypeScript
- `@types/express` - Tipos para Express
- `@types/node` - Tipos para Node.js
- `@types/jest` - Tipos para Jest
- `jest` - Framework de testes
- `ts-jest` - Suporte Jest para TypeScript
- `@nestjs/cli` - CLI do NestJS

## Frontend (Next.js)

### Dependências Principais
- `next` - Framework Next.js
- `react` - Biblioteca React
- `react-dom` - Renderização React para web

### Dependências de Desenvolvimento
- `typescript` - Suporte para TypeScript
- `@types/react` - Tipos para React
- `@types/react-dom` - Tipos para React DOM
- `@types/node` - Tipos para Node.js
- `autoprefixer` - Plugin PostCSS para prefixos automáticos
- `postcss` - Processador CSS
- `tailwindcss` - Framework CSS utilitário
- `eslint` - Linter JavaScript/TypeScript
- `eslint-config-next` - Configuração ESLint para Next.js

## Como Executar o Projeto

### Backend
```bash
cd backend
npm run start:dev
```
O backend estará disponível em http://localhost:3000

### Frontend
```bash
cd frontend
npm run dev
```
O frontend estará disponível em http://localhost:3001 (ou próxima porta disponível)