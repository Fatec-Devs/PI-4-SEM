import crypto from 'crypto';

const SECRET = process.env.AUTH_SECRET || 'dev_secret_change_this';

function base64urlEncode(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(input: string) {
  const pad = 4 - (input.length % 4);
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + (pad === 4 ? '' : '='.repeat(pad));
  return Buffer.from(base64, 'base64').toString('utf8');
}

export function signToken(payload: Record<string, unknown>, expiresInSeconds = 3600) {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const full = { ...payload, exp };
  const body = JSON.stringify(full);
  const bodyB64 = base64urlEncode(body);

  const hmac = crypto.createHmac('sha256', SECRET).update(bodyB64).digest('hex');
  return `${bodyB64}.${hmac}`;
}

export function verifyToken(token: string) {
  try {
    const [bodyB64, signature] = token.split('.');
    if (!bodyB64 || !signature) return null;

    const expected = crypto.createHmac('sha256', SECRET).update(bodyB64).digest('hex');
    // constant-time compare
    const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    if (!valid) return null;

    const body = base64urlDecode(bodyB64);
    const parsed = JSON.parse(body) as { exp?: number } & Record<string, unknown>;
    if (typeof parsed.exp === 'number' && parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}
