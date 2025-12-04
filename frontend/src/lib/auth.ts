import { cookies } from 'next/headers';
import crypto from 'crypto';

export interface SessionData {
  userId: string;
  username: string;
  type: 'employee' | 'application';
  role?: 'ADMIN' | 'COMUM' | 'ROLE_1' | 'ROLE_2' | 'ROLE_3' | 'ROLE_4';
}

const SESSION_COOKIE_NAME = 'session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-this';

export function encryptSession(data: SessionData): string {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(SESSION_SECRET, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptSession(encryptedData: string): SessionData | null {
  try {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(SESSION_SECRET, 'salt', 32);
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Erro ao descriptografar sessão:', error);
    return null;
  }
}

export async function createSession(data: SessionData) {
  const cookieStore = await cookies();
  const encrypted = encryptSession(data);
  
  cookieStore.set(SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  return decryptSession(sessionCookie.value);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();
  
  if (session.type !== 'employee' || session.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }
  
  return session;
}
