import {
  SecretsManagerClient,
  CreateSecretCommand,
  GetSecretValueCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
} from '@aws-sdk/client-secrets-manager';
import crypto from 'crypto';

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

// Flag para controlar se usa AWS Secrets Manager ou armazenamento local
export const isAwsEnabled = (): boolean => {
  return process.env.USE_AWS_SECRETS === 'true';
};

export function generateStrongPassword(length: number = 24): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const allChars = lowercase + uppercase + numbers + symbols;

  let password = '';
  password += lowercase[crypto.randomInt(lowercase.length)];
  password += uppercase[crypto.randomInt(uppercase.length)];
  password += numbers[crypto.randomInt(numbers.length)];
  password += symbols[crypto.randomInt(symbols.length)];

  for (let i = password.length; i < length; i++) {
    password += allChars[crypto.randomInt(allChars.length)];
  }

  return password
    .split('')
    .sort(() => crypto.randomInt(3) - 1)
    .join('');
}

export async function createSecret(secretName: string, password: string): Promise<string> {
  const command = new CreateSecretCommand({
    Name: secretName,
    SecretString: JSON.stringify({ password }),
    Description: `Password for application user ${secretName}`,
  });

  const response = await client.send(command);
  return response.ARN || '';
}

export async function getSecret(secretName: string): Promise<string | null> {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });

    const response = await client.send(command);
    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      return secret.password;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter secret:', error);
    return null;
  }
}

export async function updateSecret(secretName: string, newPassword: string): Promise<void> {
  const command = new UpdateSecretCommand({
    SecretId: secretName,
    SecretString: JSON.stringify({ password: newPassword }),
  });

  await client.send(command);
}

export async function deleteSecret(secretName: string): Promise<void> {
  const command = new DeleteSecretCommand({
    SecretId: secretName,
    ForceDeleteWithoutRecovery: true,
  });

  await client.send(command);
}

export function getSecretName(username: string): string {
  // Sanitizar username: remover caracteres especiais e espaços
  // AWS Secrets Manager aceita: a-z, A-Z, 0-9, /_+=.@-
  const sanitized = username.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  return `app-user-${sanitized}`;
}
