# 📧 Configuração AWS SES para Notificações de Email

## 🎯 Visão Geral

Este documento explica como configurar o **AWS SES (Simple Email Service)** para enviar notificações por email quando:
- Um novo usuário de aplicação é criado
- Uma senha é rotacionada/trocada
- Uma senha está próxima de expirar (10 dias antes)
- Uma senha expirou e o usuário foi desativado

**Por que SES?** Permite enviar emails para **qualquer endereço** (@gmail, @hotmail, @outlook, etc.) sem necessidade de confirmação prévia de cada destinatário.

---

## 💰 Custo do SES

### Pricing SES (us-east-1)
- **Primeiros 62.000 emails/mês**: GRÁTIS (se enviado de EC2)
- **Sem EC2**: $0.10 por 1.000 emails
- **Emails recebidos**: $0.10 por 1.000 emails

### Exemplo de Custos
| Cenário | Emails/Mês | Custo Mensal |
|---------|------------|--------------|
| 10 usuários, 1 rotação/mês | ~10 emails | **GRÁTIS** |
| 50 usuários, 1 rotação/mês | ~50 emails | **GRÁTIS** |
| 100 usuários, 1 rotação/mês | ~100 emails | **$0.01** |
| 500 usuários, 1 rotação/mês | ~500 emails | **$0.05** |
| 2.000 usuários, 1 rotação/mês | ~2.000 emails | **$0.20** |

**Conclusão**: Custo praticamente **ZERO** para este uso 🎉

---

## 🔧 Configuração Passo a Passo

### 1️⃣ Verificar Email Remetente (Sender)

**Via AWS Console (Recomendado):**

1. Acesse: https://console.aws.amazon.com/ses
2. No menu lateral, clique em **"Verified identities"**
3. Clique em **"Create identity"**
4. Escolha **"Email address"**
5. Digite: `noreply@johndeere.com` (ou seu email corporativo)
6. Clique em **"Create identity"**
7. **Verifique o email**: AWS enviará um link de confirmação
8. Clique no link para verificar

**Via AWS CLI:**
```bash
aws ses verify-email-identity \
  --email-address noreply@johndeere.com \
  --region us-east-1
```

⚠️ **IMPORTANTE**: Sem verificar o remetente, **nenhum email será enviado**!

---

### 2️⃣ Solicitar Saída do Sandbox (Produção)

Por padrão, SES começa no **Sandbox** com limitações:
- ✅ Pode enviar para emails verificados
- ❌ NÃO pode enviar para qualquer email
- ❌ Limite de 200 emails/dia

**Para produção**, solicite saída do Sandbox:

1. No Console SES, clique em **"Account dashboard"**
2. Clique em **"Request production access"**
3. Preencha o formulário:
   - **Mail type**: Transactional
   - **Use case**: Sistema de gerenciamento de usuários - notificações automáticas
   - **Bounce rate**: < 2%
   - **Compliance**: Apenas usuários que cadastramos
4. Aguarde aprovação (geralmente 24h)

**Enquanto no Sandbox**: Você pode testar verificando os emails dos responsáveis manualmente.

---

### 3️⃣ Configurar Variáveis de Ambiente

Adicione ao arquivo `.env`:

```env
# AWS SES Configuration
AWS_SES_SENDER_EMAIL=noreply@johndeere.com
USE_AWS_SES=true

# AWS Credentials (já configuradas)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=SEU_ACCESS_KEY_AQUI
AWS_SECRET_ACCESS_KEY=SUA_SECRET_KEY_AQUI
```

---

### 4️⃣ Instalar Dependência AWS SDK

```bash
cd frontend
npm install @aws-sdk/client-ses
```

---

## 📝 Como Funciona

### 1. Novo Usuário Criado
```
Admin cria usuário com owner_email = "joao.silva@gmail.com"
↓
Sistema envia email via SES diretamente para joao.silva@gmail.com
↓
João recebe email instantaneamente (sem confirmação prévia)
```

**Email enviado:**
```
De: noreply@johndeere.com
Para: joao.silva@gmail.com
Assunto: [John Deere] Novo usuário de aplicação criado: app.test

Olá,

Um novo usuário de aplicação foi criado no sistema John Deere:

Usuário: app.test
Data de criação: 03/12/2025 às 14:30
Data de expiração da senha: 22/01/2026

Para visualizar a senha, acesse o dashboard de administração...
```

---

### 2. Senha Rotacionada
```
Trigger: POST /api/app-users/bulk-rotate
↓
Rotaciona senha do usuário
↓
Envia email SES diretamente para owner_email
```

**Email enviado:**
```
De: noreply@johndeere.com
Para: maria.santos@hotmail.com
Assunto: [John Deere] Senha alterada: app.production

Olá,

A senha do usuário de aplicação "app.production" foi alterada no sistema John Deere.

Detalhes:
- Usuário: app.production
- Data da alteração: 03/12/2025 às 15:45
- Alterado por: admin
- Nova data de expiração: 22/01/2026
```

---

### 3. Senha Próxima de Expirar (10 dias)
```
Trigger: Cron Job / Lambda (opcional)
↓
Verifica senhas expirando em 10 dias
↓
Envia email SES para cada responsável
```

**Email enviado:**
```
De: noreply@johndeere.com
Para: pedro.costa@outlook.com
Assunto: [John Deere] ⚠️ Senha expirando em breve: app.analytics

Olá,

A senha do usuário de aplicação "app.analytics" está próxima de expirar.

⚠️ ATENÇÃO:
- Usuário: app.analytics
- Dias restantes: 10 dias
- Data de expiração: 13/12/2025

AÇÃO NECESSÁRIA:
Acesse o dashboard de administração e rotacione a senha...
```

---

### 4. Senha Expirada
```
Trigger: Login com senha expirada
↓
Desativa usuário (status = INACTIVE)
↓
Envia email SES para responsável
```

**Email enviado:**
```
De: noreply@johndeere.com
Para: ana.oliveira@johndeere.com
Assunto: [John Deere] 🔴 Senha expirada: app.legacy

Olá,

A senha do usuário de aplicação "app.legacy" EXPIROU e o usuário foi DESATIVADO automaticamente.

Detalhes:
- Usuário: app.legacy
- Data de expiração: 13/12/2025
- Status: INATIVO

AÇÃO NECESSÁRIA:
1. Acesse o Dashboard de Funcionários
2. Rotacione a senha
3. Reative o usuário
```

---

## 🔐 Permissões IAM Necessárias

Adicione à política IAM do usuário AWS:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ses:GetSendQuota",
        "ses:GetSendStatistics"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 🧪 Testar Notificações

### Teste Manual via AWS CLI

```bash
aws ses send-email \
  --from noreply@johndeere.com \
  --to seu.email@gmail.com \
  --subject "[Teste] Notificação John Deere" \
  --text "Este é um teste de notificação do sistema." \
  --region us-east-1
```

### Teste via Aplicação (Modo Simulação)

Antes de configurar o SES, o sistema roda em **modo simulação**:

1. Crie um usuário de aplicação
2. Informe o email do responsável
3. Verifique o **console do servidor** (terminal)
4. Você verá o email que seria enviado

```
📧 [SIMULAÇÃO] Email que seria enviado via SES:
   De: noreply@johndeere.com
   Para: teste@gmail.com
   Assunto: [John Deere] Novo usuário de aplicação criado: app.test
   Mensagem:
   Olá,
   
   Um novo usuário de aplicação foi criado...
```

---

## 📊 Monitoramento

### CloudWatch Metrics
O SES automaticamente publica métricas no CloudWatch:
- **Send**: Total de emails enviados
- **Delivery**: Emails entregues com sucesso
- **Bounce**: Emails rejeitados (endereço inválido)
- **Complaint**: Marcados como spam

### Visualizar Métricas
```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/SES \
  --metric-name Send \
  --start-time 2025-12-01T00:00:00Z \
  --end-time 2025-12-31T23:59:59Z \
  --period 86400 \
  --statistics Sum \
  --region us-east-1
```

### Monitorar Bounce Rate
**IMPORTANTE**: Mantenha bounce rate < 5% para evitar suspensão.

```bash
aws ses get-send-statistics --region us-east-1
```

---

## 🚀 Implementação no Código

### Criar Usuário (com notificação)

```typescript
// src/app/api/app-users/route.ts
import { notifyUserCreated } from '@/lib/aws-sns';

// Após criar usuário
if (process.env.USE_AWS_SES === 'true') {
  try {
    await notifyUserCreated(ownerEmail, username, passwordExpiresAt);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    // Não falha a criação do usuário se email falhar
  }
}
```

### Rotacionar Senha (com notificação)

```typescript
// src/app/api/app-users/bulk-rotate/route.ts
import { notifyPasswordRotated } from '@/lib/aws-sns';

// Após rotacionar senha
if (process.env.USE_AWS_SES === 'true') {
  try {
    await notifyPasswordRotated(user.ownerEmail, user.username, newExpiresAt, session.username);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}
```

---

## ❓ FAQ

### 1. Preciso verificar cada email de destinatário?
**NÃO!** Com SES fora do Sandbox, você envia para qualquer email (@gmail, @hotmail, @outlook, etc.) sem verificação prévia.

### 2. Como sair do Sandbox rapidamente?
Preencha o formulário com informações claras:
- Tipo: Transactional emails
- Descrição: Sistema interno de gestão de credenciais
- Taxa de bounce esperada: < 2%
- Geralmente aprovado em 24h

### 3. Posso testar antes de sair do Sandbox?
**SIM!** Você pode:
- Verificar manualmente alguns emails de teste no SES
- Usar modo simulação (loga no console sem enviar)
- Enviar para emails verificados

### 4. E se o email cair no spam?
Configure SPF/DKIM no SES:
1. No Console SES, vá em "Verified identities"
2. Selecione seu email/domínio
3. Configure "DKIM" e "SPF"
4. Adicione os registros DNS

### 5. Quanto custa enviar 1.000 emails/mês?
**$0.10** (10 centavos de dólar)

---

## 🔄 Comparação: SES vs SNS

| Recurso | SES | SNS |
|---------|-----|-----|
| **Custo** | $0.10/1k emails | $2.00/100k emails |
| **Destinatários** | Qualquer email | Precisa subscription |
| **Configuração** | Verificar sender | Criar tópico + subscriptions |
| **HTML** | ✅ Suportado | ❌ Apenas texto |
| **Dinâmico** | ✅ Envia para qualquer email | ❌ Precisa confirmar cada um |
| **Ideal para** | **Este projeto** | Notificações internas |

**Vencedor para este caso**: ✅ **SES**

---

## 📌 Checklist de Configuração

- [ ] Verificar email remetente no SES (`noreply@johndeere.com`)
- [ ] Confirmar email de verificação (clicar no link)
- [ ] Solicitar saída do Sandbox (produção)- [ ] Adicionar permissões SES ao usuário IAM
- [ ] Configurar variáveis no `.env`:
  - `AWS_SES_SENDER_EMAIL=noreply@johndeere.com`
  - `USE_AWS_SES=true`
- [ ] Instalar SDK: `npm install @aws-sdk/client-ses`
- [ ] Rodar migration: `add_owner_email.sql`
- [ ] Testar em modo simulação (console)
- [ ] Testar envio real de email
- [ ] Configurar SPF/DKIM (opcional, para evitar spam)

---

*Última atualização: Dezembro 2025*  
*Serviço: AWS SES (Simple Email Service)*  
*Região: US East (N. Virginia) - us-east-1*
