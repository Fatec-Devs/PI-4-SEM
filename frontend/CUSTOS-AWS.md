# 💰 Estimativa de Custos AWS - John Deere Application User Manager

## 📊 Versão Atual do Sistema

### Serviços Utilizados
- **AWS RDS (PostgreSQL)** - Banco de dados
- **AWS Secrets Manager** - Armazenamento seguro de senhas
- **AWS Data Transfer** - Transferência de dados

### Premissas de Cálculo
- Região: **us-east-1** (N. Virginia)
- Uso: **24/7** (730 horas/mês)
- Período de retenção de secrets: **30 dias**
- Backup automático RDS: **7 dias**
- Cada usuário: ~1KB de dados no banco + 1 secret no Secrets Manager

---

## 💵 Cenário 1: Versão Atual (RDS + Secrets Manager)

### 10 Usuários

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.micro (1 vCPU, 1GB RAM) | $12.41 |
| **Storage RDS** | 20 GB SSD (gp2) | $2.30 |
| **Backup RDS** | 20 GB (7 dias) | $2.00 |
| **Secrets Manager** | 10 secrets armazenados | $0.40 |
| **Secrets Manager API** | ~300 chamadas/mês | $0.00 |
| **Data Transfer** | ~1 GB/mês (out) | $0.09 |
| **TOTAL** | | **$17.20/mês** |
| **TOTAL ANUAL** | | **$206.40/ano** |

---

### 50 Usuários

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.small (2 vCPU, 2GB RAM) | $24.82 |
| **Storage RDS** | 20 GB SSD (gp2) | $2.30 |
| **Backup RDS** | 20 GB (7 dias) | $2.00 |
| **Secrets Manager** | 50 secrets armazenados | $2.00 |
| **Secrets Manager API** | ~1,500 chamadas/mês | $0.01 |
| **Data Transfer** | ~3 GB/mês (out) | $0.27 |
| **TOTAL** | | **$31.40/mês** |
| **TOTAL ANUAL** | | **$376.80/ano** |

---

### 100 Usuários

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.small (2 vCPU, 2GB RAM) | $24.82 |
| **Storage RDS** | 30 GB SSD (gp2) | $3.45 |
| **Backup RDS** | 30 GB (7 dias) | $3.00 |
| **Secrets Manager** | 100 secrets armazenados | $4.00 |
| **Secrets Manager API** | ~3,000 chamadas/mês | $0.02 |
| **Data Transfer** | ~5 GB/mês (out) | $0.45 |
| **TOTAL** | | **$35.74/mês** |
| **TOTAL ANUAL** | | **$428.88/ano** |

---

### 500 Usuários

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.medium (2 vCPU, 4GB RAM) | $49.64 |
| **Storage RDS** | 50 GB SSD (gp2) | $5.75 |
| **Backup RDS** | 50 GB (7 dias) | $5.00 |
| **Secrets Manager** | 500 secrets armazenados | $20.00 |
| **Secrets Manager API** | ~15,000 chamadas/mês | $0.08 |
| **Data Transfer** | ~15 GB/mês (out) | $1.35 |
| **TOTAL** | | **$81.82/mês** |
| **TOTAL ANUAL** | | **$981.84/ano** |

---

## 🔄 Cenário 2: Versão Completa (com Rotação Automática + Notificações)

### Serviços Adicionais
- **AWS Lambda** - Função de rotação automática de senhas
- **CloudWatch Logs** - Logs de execução e monitoramento
- **CloudWatch Events** - Trigger programado para rotação
- **SES (Simple Email Service)** - Envio de emails de notificação

### Premissas Adicionais
- Rotação de senhas: **A cada 50 dias** (configurável)
- Lambda executa: **1x por dia** para checar senhas expiradas
- Lambda runtime: **~500ms** por execução
- CloudWatch Logs: **~500 MB/mês**
- Email enviado: **1 por rotação de senha + 1 ao criar usuário**
- SES: **$0.10 por 1.000 emails** (primeiros 1.000 grátis sem EC2)

---

### 10 Usuários (com rotação automática)

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.micro (1 vCPU, 1GB RAM) | $12.41 |
| **Storage RDS** | 20 GB SSD (gp2) | $2.30 |
| **Backup RDS** | 20 GB (7 dias) | $2.00 |
| **Secrets Manager** | 10 secrets armazenados | $0.40 |
| **Secrets Manager API** | ~1,000 chamadas/mês (rotação) | $0.01 |
| **Lambda** | 30 execuções/mês (128MB, 500ms) | $0.00 |
| **CloudWatch Logs** | 500 MB armazenados | $0.03 |
| **CloudWatch Events** | 30 triggers/mês | $0.00 |
| **SES** | ~12 emails/mês (criação + rotação) | $0.00 |
| **Data Transfer** | ~1.5 GB/mês (out) | $0.14 |
| **TOTAL** | | **$17.29/mês** |
| **TOTAL ANUAL** | | **$207.48/ano** |
| **DIFERENÇA** | vs Versão Atual | **+$0.09/mês (+$1.08/ano)** |

---

### 50 Usuários (com rotação automática)

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.small (2 vCPU, 2GB RAM) | $24.82 |
| **Storage RDS** | 20 GB SSD (gp2) | $2.30 |
| **Backup RDS** | 20 GB (7 dias) | $2.00 |
| **Secrets Manager** | 50 secrets armazenados | $2.00 |
| **Secrets Manager API** | ~4,000 chamadas/mês (rotação) | $0.02 |
| **Lambda** | 30 execuções/mês (256MB, 500ms) | $0.00 |
| **CloudWatch Logs** | 1 GB armazenados | $0.05 |
| **CloudWatch Events** | 30 triggers/mês | $0.00 |
| **SES** | ~60 emails/mês (criação + rotação) | $0.00 |
| **Data Transfer** | ~4 GB/mês (out) | $0.36 |
| **TOTAL** | | **$31.55/mês** |
| **TOTAL ANUAL** | | **$378.60/ano** |
| **DIFERENÇA** | vs Versão Atual | **+$0.15/mês (+$1.80/ano)** |

---

### 100 Usuários (com rotação automática)

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.small (2 vCPU, 2GB RAM) | $24.82 |
| **Storage RDS** | 30 GB SSD (gp2) | $3.45 |
| **Backup RDS** | 30 GB (7 dias) | $3.00 |
| **Secrets Manager** | 100 secrets armazenados | $4.00 |
| **Secrets Manager API** | ~7,000 chamadas/mês (rotação) | $0.04 |
| **Lambda** | 30 execuções/mês (512MB, 500ms) | $0.00 |
| **CloudWatch Logs** | 2 GB armazenados | $0.10 |
| **CloudWatch Events** | 30 triggers/mês | $0.00 |
| **SES** | ~120 emails/mês (criação + rotação) | $0.00 |
| **Data Transfer** | ~6 GB/mês (out) | $0.54 |
| **TOTAL** | | **$35.96/mês** |
| **TOTAL ANUAL** | | **$431.52/ano** |
| **DIFERENÇA** | vs Versão Atual | **+$0.22/mês (+$2.64/ano)** |

---

### 500 Usuários (com rotação automática)

| Serviço | Especificação | Custo Mensal |
|---------|---------------|--------------|
| **RDS PostgreSQL** | db.t3.medium (2 vCPU, 4GB RAM) | $49.64 |
| **Storage RDS** | 50 GB SSD (gp2) | $5.75 |
| **Backup RDS** | 50 GB (7 dias) | $5.00 |
| **Secrets Manager** | 500 secrets armazenados | $20.00 |
| **Secrets Manager API** | ~30,000 chamadas/mês (rotação) | $0.15 |
| **Lambda** | 30 execuções/mês (1024MB, 1s) | $0.00 |
| **CloudWatch Logs** | 5 GB armazenados | $0.25 |
| **CloudWatch Events** | 30 triggers/mês | $0.00 |
| **SES** | ~600 emails/mês (criação + rotação) | $0.00 |
| **Data Transfer** | ~20 GB/mês (out) | $1.80 |
| **TOTAL** | | **$82.62/mês** |
| **TOTAL ANUAL** | | **$991.44/ano** |
| **DIFERENÇA** | vs Versão Atual | **+$0.80/mês (+$9.60/ano)** |

---

## 📈 Comparativo Geral

| Usuários | Versão Atual (Mensal) | Versão Completa (Mensal) | Diferença | Custo por Usuário |
|----------|----------------------|--------------------------|-----------|-------------------|
| **10** | $17.20 | $17.29 | +$0.09 | $1.73/usuário |
| **50** | $31.40 | $31.55 | +$0.15 | $0.63/usuário |
| **100** | $35.74 | $35.96 | +$0.22 | $0.36/usuário |
| **500** | $81.82 | $82.62 | +$0.80 | $0.17/usuário |

---

## 💡 Observações Importantes

### ✅ Vantagens da Versão Completa
- **Automação total** - Sem intervenção manual para rotação
- **Conformidade** - Políticas de segurança automatizadas
- **Auditoria** - Logs centralizados no CloudWatch
- **Notificações** - Responsáveis informados automaticamente
- **Custo adicional mínimo** - Apenas $0.09 a $0.80/mês a mais

### 📊 Economia de Escala
- **Custo por usuário diminui** com mais usuários
- **10 usuários**: $1.73/usuário/mês
- **500 usuários**: $0.17/usuário/mês (10x mais barato)

### 🔒 Segurança vs Custo
- **Secrets Manager**: Mais caro que armazenamento local, mas muito mais seguro
- **Alternativa**: Armazenar senhas apenas no banco (economiza ~$20/mês para 500 usuários)
- **Recomendação**: Manter Secrets Manager para compliance e segurança

### 💰 Otimizações Possíveis
1. **RDS Reserved Instances** - Economia de até 40% com compromisso de 1 ano
2. **Reduzir período de backup** - De 7 para 3 dias (economiza ~30%)
3. **Usar RDS Aurora Serverless** - Paga apenas quando usa (para workloads variáveis)
4. **Desabilitar Secrets Manager** - Economiza $4-20/mês (não recomendado)

### 📅 Custos com Reserved Instances (1 ano)

| Usuários | RDS On-Demand | RDS Reserved (1y) | Economia Anual |
|----------|---------------|-------------------|----------------|
| 10 | $148.92/ano | $89.35/ano | **-$59.57** |
| 50 | $297.84/ano | $178.70/ano | **-$119.14** |
| 100 | $297.84/ano | $178.70/ano | **-$119.14** |
| 500 | $595.68/ano | $357.41/ano | **-$238.27** |

---

## 🎯 Recomendação Final

### Para este projeto (John Deere):
- ✅ **Versão Completa** é altamente recomendada
- ✅ Custo adicional é **mínimo** ($0.09 a $0.80/mês)
- ✅ Benefícios de **automação e segurança** superam o custo
- ✅ Para 100-500 usuários: **Considerar Reserved Instances**

### ROI (Return on Investment):
- **Tempo economizado**: ~2 horas/mês em gestão manual de senhas
- **Valor do tempo**: $50/hora (estimativa conservadora)
- **Economia mensal**: $100 em tempo vs $0.22 adicional em AWS
- **ROI**: **~45.000%** 🚀

---

## 📞 Próximos Passos

1. **Implementar versão completa** com Lambda + SNS
2. **Configurar alertas** no CloudWatch para monitoramento
3. **Após 6 meses**: Avaliar migração para Reserved Instances
4. **Revisar custos mensalmente** e ajustar recursos conforme necessário

---

*Última atualização: Dezembro 2025*  
*Preços baseados em: [AWS Pricing Calculator](https://calculator.aws)*  
*Região: US East (N. Virginia) - us-east-1*
