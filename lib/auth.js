// Simple cookie-based auth using bcryptjs + random session tokens.
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export const SALT_ROUNDS = 10;
export const SESSION_COOKIE = 'atp_session';
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken() {
  return crypto.randomUUID();
}

export function getSessionToken() {
  try {
    const cookieStore = cookies();
    return cookieStore.get(SESSION_COOKIE)?.value || null;
  } catch {
    return null;
  }
}

export function setSessionCookie(token) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
}
