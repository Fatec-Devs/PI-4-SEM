import {
  SecretsManagerClient,
  CreateSecretCommand,
  GetSecretValueCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
} from '@aws-sdk/client-secrets-manager';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// If AWS credentials are not present, use a local JSON file as fallback for development.
const hasAwsCreds = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION);
const client = hasAwsCreds
  ? new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' })
  : undefined;

const LOCAL_SECRETS_FILE = path.join(process.cwd(), '.local-secrets.json');

function readLocalStore(): Record<string, { password: string }> {
  try {
    if (!fs.existsSync(LOCAL_SECRETS_FILE)) return {};
    const raw = fs.readFileSync(LOCAL_SECRETS_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Error reading local secrets file:', err);
    return {};
  }
}

function writeLocalStore(store: Record<string, { password: string }>) {
  try {
    fs.writeFileSync(LOCAL_SECRETS_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing local secrets file:', err);
  }
}

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
  if (!client) {
    const store = readLocalStore();
    store[secretName] = { password };
    writeLocalStore(store);
    return `local:${secretName}`;
  }

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
    if (!client) {
      const store = readLocalStore();
      return store[secretName]?.password ?? null;
    }

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
    console.error('Error getting secret:', error);
    return null;
  }
}

export async function updateSecret(secretName: string, newPassword: string): Promise<void> {
  if (!client) {
    const store = readLocalStore();
    store[secretName] = { password: newPassword };
    writeLocalStore(store);
    return;
  }

  const command = new UpdateSecretCommand({
    SecretId: secretName,
    SecretString: JSON.stringify({ password: newPassword }),
  });

  await client.send(command);
}

export async function deleteSecret(secretName: string): Promise<void> {
  if (!client) {
    const store = readLocalStore();
    delete store[secretName];
    writeLocalStore(store);
    return;
  }

  const command = new DeleteSecretCommand({
    SecretId: secretName,
    ForceDeleteWithoutRecovery: true,
  });

  await client.send(command);
}

export function getSecretName(userId: string): string {
  return `app-user-${userId}`;
}
