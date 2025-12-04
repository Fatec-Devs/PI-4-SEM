import { SESClient, SendEmailCommand, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface EmailNotification {
  to: string;
  subject: string;
  message: string;
}

/**
 * Verifica se AWS SES está habilitado
 */
export function isSesEnabled(): boolean {
  return process.env.USE_AWS_SES === 'true' && !!process.env.AWS_SES_SENDER_EMAIL;
}

/**
 * Envia email via AWS SES
 * @param notification - Dados da notificação (destinatário, assunto, mensagem)
 * @returns Message ID do SES
 */
export async function sendEmail(notification: EmailNotification): Promise<string> {
  const { to, subject, message } = notification;

  console.log('📧 ==========================================================');
  console.log('📧 TENTANDO ENVIAR EMAIL');
  console.log(`📧 De: ${process.env.AWS_SES_SENDER_EMAIL}`);
  console.log(`📧 Para: ${to}`);
  console.log(`📧 Assunto: ${subject}`);
  console.log(`📧 SES Habilitado: ${isSesEnabled()}`);
  console.log('📧 ==========================================================');

  if (!isSesEnabled()) {
    // Modo de simulação - apenas loga
    console.log('📧 [SIMULAÇÃO] Email que seria enviado via SES:');
    console.log(`   De: ${process.env.AWS_SES_SENDER_EMAIL || 'noreply@johndeere.com'}`);
    console.log(`   Para: ${to}`);
    console.log(`   Assunto: ${subject}`);
    console.log(`   Mensagem:\n${message}`);
    return 'simulated-message-id';
  }

  const params = {
    Source: process.env.AWS_SES_SENDER_EMAIL!, // Email verificado no SES
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: message,
          Charset: 'UTF-8',
        },
      },
    },
  };

  console.log('📧 Parâmetros do email:', JSON.stringify(params, null, 2));

  try {
    const command = new SendEmailCommand(params);
    console.log('📧 Enviando comando para SES...');
    const response = await sesClient.send(command);

    console.log(`✅ Email enviado via SES para ${to} (MessageId: ${response.MessageId})`);
    console.log('✅ Resposta completa do SES:', JSON.stringify(response, null, 2));
    return response.MessageId || 'unknown';
  } catch (error: any) {
    console.error(`❌ Erro ao enviar email via SES para ${to}:`, error);
    
    // Log específico de erros comuns
    if (error.name === 'MessageRejected') {
      console.error('   → Email rejeitado. Verifique se o remetente está verificado no SES.');
    } else if (error.name === 'MailFromDomainNotVerifiedException') {
      console.error('   → Domínio não verificado. Configure o domínio no SES.');
    } else if (error.message?.includes('not verified')) {
      console.error('   → Email do remetente não verificado. Verifique em: AWS Console > SES > Verified identities');
    }
    
    throw error;
  }
}

/**
 * Adiciona email à lista de identidades verificadas do SES (Sandbox mode)
 * AWS enviará email de confirmação automaticamente
 */
export async function verifyEmailIdentity(email: string): Promise<boolean> {
  if (!isSesEnabled()) {
    console.log(`📧 [SIMULAÇÃO] Email ${email} seria adicionado às identidades do SES`);
    return true;
  }

  try {
    console.log(`🔄 Solicitando verificação do email ${email} no SES...`);
    
    const command = new VerifyEmailIdentityCommand({
      EmailAddress: email,
    });
    
    const response = await sesClient.send(command);
    console.log(`✅ Verificação solicitada com sucesso para ${email}`);
    console.log(`   → AWS enviou email de confirmação. O destinatário deve clicar no link.`);
    console.log(`   → Resposta SES:`, JSON.stringify(response, null, 2));
    return true;
  } catch (error: any) {
    console.error(`❌ Erro ao solicitar verificação do email ${email}:`, error);
    console.error(`   → Tipo do erro: ${error.name}`);
    console.error(`   → Mensagem: ${error.message}`);
    
    // Não falha a operação - apenas loga o erro
    if (error.name === 'MessageRejected') {
      console.error('   → Email já está na lista de verificação ou é inválido');
    } else if (error.name === 'AlreadyExists') {
      console.log('   → Email já foi adicionado anteriormente (aguardando verificação ou já verificado)');
    }
    
    return false;
  }
}

/**
 * Notifica sobre criação de novo usuário
 */
export async function notifyUserCreated(ownerEmail: string, username: string, expiresAt: Date) {
  const expirationDate = expiresAt.toLocaleDateString('pt-BR');
  
  return sendEmail({
    to: ownerEmail,
    subject: `[John Deere] Novo usuário de aplicação criado: ${username}`,
    message: `
Olá,

Um novo usuário de aplicação foi criado no sistema John Deere:

Usuário: ${username}
Data de criação: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
Data de expiração da senha: ${expirationDate}

Para visualizar a senha, acesse o dashboard de administração através do seu usuário funcionário.

⚠️ IMPORTANTE: A senha expira em ${expirationDate}. Após essa data, o usuário será automaticamente desativado.

---
Sistema de Gerenciamento de Usuários - John Deere
Este é um email automático, não responda.
    `.trim(),
  });
}

/**
 * Notifica sobre rotação de senha
 */
export async function notifyPasswordRotated(ownerEmail: string, username: string, expiresAt: Date, rotatedBy: string) {
  const expirationDate = expiresAt.toLocaleDateString('pt-BR');
  
  return sendEmail({
    to: ownerEmail,
    subject: `[John Deere] Senha alterada: ${username}`,
    message: `
Olá,

A senha do usuário de aplicação "${username}" foi alterada no sistema John Deere.

Detalhes:
- Usuário: ${username}
- Data da alteração: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
- Alterado por: ${rotatedBy}
- Nova data de expiração: ${expirationDate}

Para visualizar a nova senha, acesse o dashboard de administração através do seu usuário funcionário.

⚠️ IMPORTANTE: A nova senha expira em ${expirationDate}.

---
Sistema de Gerenciamento de Usuários - John Deere
Este é um email automático, não responda.
    `.trim(),
  });
}

/**
 * Notifica que a senha está próxima de expirar (10 dias)
 */
export async function notifyPasswordExpiringSoon(ownerEmail: string, username: string, expiresAt: Date, daysRemaining: number) {
  const expirationDate = expiresAt.toLocaleDateString('pt-BR');
  
  return sendEmail({
    to: ownerEmail,
    subject: `[John Deere] ⚠️ Senha expirando em breve: ${username}`,
    message: `
Olá,

A senha do usuário de aplicação "${username}" está próxima de expirar.

⚠️ ATENÇÃO:
- Usuário: ${username}
- Dias restantes: ${daysRemaining} dias
- Data de expiração: ${expirationDate}

AÇÃO NECESSÁRIA:
Acesse o dashboard de administração e rotacione a senha do usuário antes da data de expiração.
Após a expiração, o usuário será automaticamente desativado e não conseguirá fazer login.

Para rotacionar a senha:
1. Acesse o Dashboard de Funcionários
2. Localize o usuário "${username}"
3. Clique em "Rotacionar Senha" ou edite a data de expiração

---
Sistema de Gerenciamento de Usuários - John Deere
Este é um email automático, não responda.
    `.trim(),
  });
}

/**
 * Notifica que a senha expirou
 */
export async function notifyPasswordExpired(ownerEmail: string, username: string, expiredAt: Date) {
  const expirationDate = expiredAt.toLocaleDateString('pt-BR');
  
  return sendEmail({
    to: ownerEmail,
    subject: `[John Deere] 🔴 Senha expirada: ${username}`,
    message: `
Olá,

A senha do usuário de aplicação "${username}" EXPIROU e o usuário foi DESATIVADO automaticamente.

Detalhes:
- Usuário: ${username}
- Data de expiração: ${expirationDate}
- Status: INATIVO
- Data da desativação: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}

AÇÃO NECESSÁRIA:
1. Acesse o Dashboard de Funcionários
2. Localize o usuário "${username}"
3. Rotacione a senha
4. Reative o usuário (altere status para ATIVO)

O usuário não conseguirá fazer login até que a senha seja rotacionada e o status seja alterado para ATIVO.

---
Sistema de Gerenciamento de Usuários - John Deere
Este é um email automático, não responda.
    `.trim(),
  });
}
