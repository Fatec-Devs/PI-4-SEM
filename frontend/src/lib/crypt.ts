import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

// Gere uma chave forte no .env
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.CRYPTO_KEY || "default_key")
  .digest();

/**
 * Criptografar
 */
export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  const tag = cipher.getAuthTag().toString("base64");

  return {
    iv: iv.toString("base64"),
    content: encrypted,
    tag,
  };
}

/**
 * Descriptografar
 */
export function decrypt(enc: { iv: string; content: string; tag: string }) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(enc.iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(enc.tag, "base64"));

  let decrypted = decipher.update(enc.content, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
