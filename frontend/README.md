# Sistema de Gerenciamento de Usuários - John Deere

Sistema completo de gerenciamento de usuários com Next.js, Prisma, PostgreSQL e AWS Secrets Manager.

## 🎯 Funcionalidades

### Tipos de Usuário

1. **Funcionários** (Admin e Read-Only)
   - Admin: CRUD completo de usuários de aplicação
   - Read-Only: Apenas visualização

2. **Usuários de Aplicação**
   - Autenticação para sistemas/serviços
   - Senhas armazenadas no AWS Secrets Manager
   - Rotação automática de senha a cada 50 dias

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20+
- PostgreSQL 14+
- Conta AWS (para Secrets Manager)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <repo-url>
cd PI-4-SEM/frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. **Configure o banco de dados**
```bash
# Execute as migrations
npx prisma migrate deploy

# Gere o Prisma Client
npx prisma generate

# Popule dados iniciais (opcional)
npm run db:seed
```

5. **Execute a aplicação**
```bash
npm run dev
```

Acesse: http://localhost:3000
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔐 Credenciais Padrão

Após executar o seed:

- **Admin**: `admin` / `Admin@123456`
- **Usuário Comum**: `user.comum` / `User@123456`

⚠️ **IMPORTANTE**: Altere estas senhas em produção!

## 📚 Documentação

Para documentação completa, consulte [DOCUMENTATION.md](./DOCUMENTATION.md)

### Principais Recursos

- ✅ Autenticação segura com bcrypt
- ✅ Controle de acesso baseado em roles (Admin/Comum)
- ✅ Gerenciamento de usuários de aplicação
- ✅ Geração automática de senhas (12 caracteres)
- ✅ Rotação automática de senhas a cada 50 dias
- ✅ Integração com AWS Secrets Manager
- ✅ Relacionamento Many-to-Many entre funcionários e times
- ✅ Sistema completo de auditoria
- ✅ Paleta de cores John Deere

## 🏗️ Arquitetura

```
frontend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts               # Script de população inicial
│   └── migrations/           # SQL migrations
├── src/
│   ├── app/
│   │   ├── admin/           # Páginas administrativas
│   │   └── api/
│   │       ├── v2/          # APIs refatoradas
│   │       │   ├── employees/
│   │       │   ├── teams/
│   │       │   ├── app-users/
│   │       │   └── auth/
│   │       └── cron/        # Endpoints de cron jobs
│   └── lib/
│       ├── auth.ts          # Autenticação e autorização
│       ├── crypto-utils.ts   # Criptografia e geração de senhas
│       ├── aws-secrets.ts    # Integração AWS Secrets Manager
│       ├── password-rotation.ts  # Rotação automática
│       └── prisma.ts        # Cliente Prisma
└── DOCUMENTATION.md         # Documentação completa
```

## 🔄 Rotação Automática de Senhas

### Configurar Cron Job

**Vercel:**
```json
{
  "crons": [{
    "path": "/api/cron/rotate-passwords",
    "schedule": "0 2 * * *"
  }]
}
```

**AWS EventBridge:**
- Schedule: `cron(0 2 * * ? *)`
- Target: API Gateway → POST /api/cron/rotate-passwords
- Header: `Authorization: Bearer {CRON_SECRET}`

**GitHub Actions:**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Com coverage
npm run test:coverage
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio
npx prisma studio

# Executar seed
npx tsx prisma/seed.ts

# Lint
npm run lint
```

## 🔧 Configuração AWS

### Criar IAM User

1. Crie um IAM user com permissões:
   - `SecretsManagerReadWrite`
   - Política customizada para prefix `johndeere/*`

2. Gere access keys

3. Configure no `.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key-id
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## 📊 API Endpoints

### Autenticação
- `POST /api/v2/auth/login` - Login de funcionários

### Funcionários
- `GET /api/v2/employees` - Listar
- `POST /api/v2/employees` - Criar (Admin)
- `PUT /api/v2/employees` - Atualizar (Admin)
- `DELETE /api/v2/employees` - Remover (Admin)

### Times
- `GET /api/v2/teams` - Listar
- `POST /api/v2/teams` - Criar (Admin)
- `PUT /api/v2/teams` - Atualizar (Admin)
- `DELETE /api/v2/teams` - Remover (Admin)

### Usuários de Aplicação
- `GET /api/v2/app-users` - Listar (filtrado por permissão)
- `POST /api/v2/app-users` - Criar (Admin)
- `PUT /api/v2/app-users` - Atualizar (Admin)
- `DELETE /api/v2/app-users` - Remover (Admin)
- `POST /api/v2/app-users/rotate-password` - Rotacionar senha (Admin)

### Cron
- `POST /api/cron/rotate-passwords` - Executar rotação automática
- `GET /api/cron/rotate-passwords` - Estatísticas

## 🎨 Paleta de Cores

```css
Verde John Deere: #367C2B
Amarelo John Deere: #FFDE00
```

## 🔒 Segurança

- Senhas hasheadas com bcrypt (12 rounds)
- Senhas de ApplicationUsers no AWS Secrets Manager
- Rotação automática a cada 50 dias
- Auditoria completa de operações
- Controle de acesso baseado em roles
- Histórico de senhas (evita reutilização)

## 📈 Próximos Passos

- [ ] Implementar JWT para sessões
- [ ] Adicionar 2FA para Admins
- [ ] Sistema de notificações por email
- [ ] Dashboard de analytics
- [ ] Export de relatórios
- [ ] Testes automatizados completos

## 📄 Licença

Propriedade da John Deere

## 🤝 Contribuindo

Para contribuir com o projeto, siga as diretrizes de desenvolvimento da organização.

---

**Versão:** 2.0.0  
**Data:** Dezembro 2025
