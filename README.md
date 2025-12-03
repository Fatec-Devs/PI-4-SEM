# 🌾 Sistema de Gerenciamento de Usuários - John Deere

Sistema completo de gerenciamento de usuários com Next.js, Prisma ORM, PostgreSQL e integração com AWS Secrets Manager para rotação automática de senhas.

**Projeto Integrador IV - Análise e Desenvolvimento de Sistemas - Fatec Indaiatuba**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=flat-square&logo=postgresql)
![AWS](https://img.shields.io/badge/AWS-Secrets%20Manager-orange?style=flat-square&logo=amazon-aws)

## 🎯 Sobre o Projeto

Sistema desenvolvido para gerenciar dois tipos de usuários:

1. **Funcionários** (Admin e Read-Only) - Pessoas físicas da empresa
2. **Usuários de Aplicação** - Sistemas e serviços (não-humanos)

### ✨ Principais Funcionalidades

- ✅ Autenticação dupla (funcionários e aplicações)
- ✅ Senhas de aplicação no AWS Secrets Manager
- ✅ Rotação automática de senha a cada 50 dias
- ✅ CRUD completo de usuários (admin)
- ✅ Operações em massa (deletar/rotacionar)
- ✅ Audit logs completos
- ✅ Dashboard admin e read-only
- ✅ Interface moderna com Tailwind CSS

## 🚀 Quick Start

```bash
# 1. Instalar dependências
cd frontend
npm install

# 2. Configurar ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Gerar Prisma Client
npx prisma generate

# 4. Setup banco de dados
npx prisma migrate deploy
npm run db:seed

# 5. Iniciar servidor
npm run dev
```

Acesse: http://localhost:3000

**Credenciais padrão:**
- Admin: `admin` / `Admin123!`
- Read-Only: `readonly` / `Read123!`

📖 **Guia completo:** Veja [INSTALL.md](./INSTALL.md)

## 📁 Estrutura do Projeto

```
PI-4-SEM/
├── frontend/              # Aplicação Next.js
│   ├── src/
│   │   ├── app/          # Pages e API Routes
│   │   └── lib/          # Utilitários (auth, AWS, prisma)
│   ├── prisma/           # Schema e migrations
│   └── ...
├── lambda/               # Rotação automática de senhas
│   ├── password-rotation.ts
│   └── ...
├── INSTALL.md           # Guia de instalação
├── QUICKSTART.md        # Início rápido
├── DEPLOY.md            # Deploy e produção
└── PROJECT_SUMMARY.md   # Resumo completo
```

## 🔐 Segurança

### Senhas
- **Funcionários**: bcrypt (hash no banco)
- **Aplicações**: AWS Secrets Manager (fora do banco)

### Sessões
- Criptografia AES-256-CBC
- Cookies HttpOnly e Secure (prod)
- Expiração de 24 horas

### Expiração
- Senhas expiram em 50 dias
- Rotação automática via Lambda
- Rotação manual disponível

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Next.js 16 |
| Linguagem | TypeScript 5 |
| Banco de Dados | PostgreSQL 14 |
| ORM | Prisma 6.6 |
| Cloud | AWS (Secrets Manager, Lambda) |
| Styling | Tailwind CSS 4 |
| Auth | Custom (AES-256) |

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [INSTALL.md](./INSTALL.md) | Guia detalhado de instalação |
| [QUICKSTART.md](./QUICKSTART.md) | Início rápido em 5 minutos |
| [DEPLOY.md](./DEPLOY.md) | Deploy e troubleshooting |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Resumo completo do projeto |
| [frontend/README.md](./frontend/README.md) | Docs técnicas do frontend |
| [lambda/README.md](./lambda/README.md) | Setup da Lambda |

## 🌐 API Endpoints

### Auth
- `POST /api/employees/login` - Login funcionário
- `POST /api/app-users/login` - Login aplicação
- `POST /api/auth/logout` - Logout

### Gestão (requer auth)
- `GET /api/app-users` - Listar usuários
- `POST /api/app-users` - Criar usuário (admin)
- `PUT /api/app-users/:id` - Atualizar (admin)
- `DELETE /api/app-users/:id` - Deletar (admin)
- `POST /api/app-users/bulk-delete` - Deletar vários (admin)
- `POST /api/app-users/bulk-rotate` - Rotacionar senhas (admin)

## 📄 Licença

Este projeto é privado e proprietário - John Deere © 2025

---

**Desenvolvido com 💚 para John Deere | Fatec Indaiatuba - 2025**


