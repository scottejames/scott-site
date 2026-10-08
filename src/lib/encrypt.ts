// Build-time encryption for the private blog.
// PBKDF2-SHA256 derives an AES-256-GCM key from the password; the browser reverses it
// in src/pages/private/index.astro. Keep ITERATIONS in sync with that page.
import { webcrypto } from 'node:crypto';

export const ITERATIONS = 600_000;

const b64 = (bytes: Uint8Array) => Buffer.from(bytes).toString('base64');

export async function encrypt(plaintext: string, password: string) {
  const { subtle } = webcrypto;
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const base = await subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveKey',
  ]);
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
  const data = await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return { salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)), iterations: ITERATIONS };
}
