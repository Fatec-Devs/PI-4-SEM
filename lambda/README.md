# Lambda Password Rotation

Esta função Lambda rotaciona automaticamente senhas de usuários de aplicação a cada 50 dias.

## Configuração

### 1. Instalar dependências
```bash
cd lambda
npm install
```

### 2. Build
```bash
npm run build
```

### 3. Empacotar para deploy
```bash
npm run package
```

### 4. Fazer upload na AWS Lambda
1. Faça upload do arquivo `function.zip` gerado
2. Configure as variáveis de ambiente:
   - `DATABASE_URL`: Connection string do RDS PostgreSQL
   - `AWS_REGION`: Região da AWS (ex: us-east-1)
3. Anexe a policy: `arn:aws:iam::503329406832:policy/lambda-pi-fatec`
4. Configure o runtime: Node.js 20.x
5. Configure o handler: `dist/password-rotation.handler`
6. Configure memória: 256 MB
7. Configure timeout: 5 minutos

### 5. Configurar EventBridge (CloudWatch Events)
1. Crie uma regra no EventBridge
2. Schedule expression: `rate(1 day)` ou `cron(0 2 * * ? *)` (executa às 2h da manhã diariamente)
3. Target: sua função Lambda

## Testando localmente

Você pode testar a função localmente:

```bash
npm run build
node -e "require('./dist/password-rotation').handler({})"
```

## Logs

Os logs ficam disponíveis no CloudWatch Logs.

## Políticas necessárias

A Lambda precisa das seguintes permissões:
- Secrets Manager: GetSecretValue, UpdateSecret, CreateSecret, DeleteSecret
- RDS: Conexão ao banco de dados (via VPC se necessário)
- CloudWatch Logs: CreateLogGroup, CreateLogStream, PutLogEvents
