# Sistema de Login John Deere - Estrutura Completa

## 🔐 Como Funciona o Sistema

O sistema John Deere possui **três áreas distintas** com diferentes tipos de acesso:

### 📋 **Fluxo de Autenticação**

#### **1. Portal Funcionários (`/`)**
- **Login unificado** para funcionários internos da John Deere
- **Detecção de Role** baseado no email:
  - Emails com `admin` ou `gerente` → **Área Administrativa**
  - Outros emails → **Portal de Funcionários**
- **Redirecionamento Automático**:
  - **Admin** → `/admin/home`
  - **Funcionário Comum** → `/funcionarios`

#### **2. Machine Track App (`/UserAPP/login`)**
- **Login separado** para operadores de campo
- Acesso direto via `/UserAPP/login`
- Foco em operações de máquinas agrícolas

### 🧪 **Como Testar**

#### **Portal Funcionários (`/`)**

**Teste como Admin:**
- **URL:** `/` (página principal)
- **Email:** `admin@johndeere.com`
- **Senha:** qualquer senha
- **Resultado:** Redireciona para `/admin/home`

**Teste como Funcionário:**
- **URL:** `/` (página principal)
- **Email:** `funcionario@johndeere.com` (qualquer email sem "admin")
- **Senha:** qualquer senha  
- **Resultado:** Redireciona para `/funcionarios`

#### **Machine Track App**

**Teste como Operador:**
- **URL:** `/UserAPP/login` (login separado)
- **Email:** `operador@johndeere.com`
- **Senha:** qualquer senha
- **Resultado:** Acesso ao Machine Track (`/UserAPP/home`)

### 🔄 **Redirecionamentos Implementados**

- `/login` → `/` (portal funcionários)
- Página principal `/` → Sistema de login com roles funcionários
- `/UserAPP/login` → Login independente para operadores

### 🎯 **Áreas do Sistema**

#### **1. Área Admin (`/admin`)**
- Dashboard administrativo
- Gerenciamento de usuários
- Configurações do sistema
- Relatórios e analytics
- Controle de equipamentos

#### **2. Portal Funcionários (`/funcionarios`)**
- Diretório interno de funcionários
- Informações da equipe
- Recursos corporativos
- Acesso somente leitura

#### **3. Machine Track App (`/UserAPP`)**
- Dashboard do operador de campo
- Meus equipamentos agrícolas
- Minhas tarefas operacionais
- Alertas de máquinas
- Sistema independente para operadores

### 📱 **Interface**

- **Branding John Deere** consistente em todas as telas
- **Cores oficiais:** Verde (#367C2B) e Amarelo (#FFDE00)
- **Logo oficial** John Deere em todas as interfaces
- **Layout responsivo** para desktop e mobile

### 🔒 **Segurança**

Em produção, a lógica de roles seria baseada em:
- JWT tokens com claims de role
- Consulta ao banco de dados para verificar permissões
- Middleware de autenticação para proteger rotas
- Sessões seguras e validação server-side

---

**Sistema reorganizado com sucesso! 🚜✅**