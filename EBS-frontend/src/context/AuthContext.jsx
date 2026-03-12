import { createContext, useState, useEffect, useRef } from "react";
import { decodeToken, isTokenExpired, msUntilExpiry } from "../utils/jwtUtils";
import { refreshTokenAPI } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth,    setAuth]    = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef(null);

  // ── Build auth object from tokens ──────────────────────────
  function buildAuth(accessToken, refreshToken, expiresIn) {
    const payload = decodeToken(accessToken);
    return {
      accessToken,
      refreshToken,
      expiresIn,
      // Extract from JWT payload — adjust field names to match
      // what your Spring Boot backend puts in the token
      customerId: payload?.customerId ?? payload?.sub,
      username:   payload?.username   ?? payload?.sub,
      email:      payload?.email,
      firstName:  payload?.firstName,
      lastName:   payload?.lastName,
      roles:      payload?.roles      ?? payload?.authorities ?? [],
      exp:        payload?.exp,
    };
  }

  // ── Schedule auto-refresh 1 minute before expiry ───────────
  function scheduleRefresh(accessToken, refreshToken) {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    const ms = msUntilExpiry(accessToken) - 60_000; // 1 min before expiry
    if (ms <= 0) return;

    refreshTimerRef.current = setTimeout(async () => {
      try {
        const data = await refreshTokenAPI(refreshToken);
        const newAuth = buildAuth(data.accessToken, data.refreshToken, data.expiresIn);
        saveToSession(data.accessToken, data.refreshToken);
        setAuth(newAuth);
        scheduleRefresh(data.accessToken, data.refreshToken);
      } catch {
        // Refresh failed — force logout
        logout();
      }
    }, ms);
  }

  // ── Save tokens to sessionStorage ──────────────────────────
  function saveToSession(accessToken, refreshToken) {
    sessionStorage.setItem("accessToken",  accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  // ── Restore session on page refresh ────────────────────────
  useEffect(() => {
    const accessToken  = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken && !isTokenExpired(accessToken)) {
      const restored = buildAuth(accessToken, refreshToken, null);
      setAuth(restored);
      scheduleRefresh(accessToken, refreshToken);
    } else if (refreshToken) {
      // Access token expired but refresh token exists — try to refresh
      refreshTokenAPI(refreshToken)
        .then((data) => {
          const newAuth = buildAuth(data.accessToken, data.refreshToken, data.expiresIn);
          saveToSession(data.accessToken, data.refreshToken);
          setAuth(newAuth);
          scheduleRefresh(data.accessToken, data.refreshToken);
        })
        .catch(() => sessionStorage.clear())
        .finally(() => setLoading(false));
      return;
    } else {
      sessionStorage.clear();
    }
    setLoading(false);
  }, []);

  // ── Login ───────────────────────────────────────────────────
  function login(data) {
    // data = { accessToken, refreshToken, expiresIn }
    const newAuth = buildAuth(data.accessToken, data.refreshToken, data.expiresIn);
    saveToSession(data.accessToken, data.refreshToken);
    setAuth(newAuth);
    scheduleRefresh(data.accessToken, data.refreshToken);
  }

  // ── Logout ──────────────────────────────────────────────────
  function logout() {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    sessionStorage.clear();
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}