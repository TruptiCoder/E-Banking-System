import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT and returns the full payload object.
 * Returns null if token is missing or malformed.
 */
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
}

export function msUntilExpiry(token) {
  const payload = decodeToken(token);
  if (!payload?.exp) return 0;
  return Math.max(0, payload.exp * 1000 - Date.now());
}