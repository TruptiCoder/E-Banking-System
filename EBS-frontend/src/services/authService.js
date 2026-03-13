
import apiClient from "./apiClient";

/**
 * POST /api/auth/login
 * Sends { username, password }
 * Returns { accessToken, refreshToken, expiresIn }
 */
export async function loginAPI(username, password) {

  //   // ── MOCK: remove this block when backend is ready ──
  // if (username === "gauri" && password === "gauri123") {
  //   return { token: "mock-jwt-token-12345", customerId: 1, username: "gauri" };
  // }
  // throw new Error("Invalid credentials");
  // // ── END MOCK ──

  const res = await apiClient.post("/api/auth/login", { username, password });
  // console.log("Login response:", res.data);
  return res.data;
}

/**
 * POST /api/auth/refresh
 * Sends { refreshToken }
 * Returns { accessToken, refreshToken, expiresIn }
 */
export async function refreshTokenAPI(refreshToken) {
  const res = await apiClient.post("/api/auth/refresh", { refreshToken });
  console.log("Refresh token response:", res.data);
  return res.data;
}

/**
 * PUT /api/auth/change-password
 * Sends { customerId, oldPassword, newPassword }
 */
export async function changePasswordAPI(customerId, oldPassword, newPassword) {
  const res = await apiClient.put("/api/auth/change-password", {
    customerId,
    oldPassword,
    newPassword,
  });
  console.log("Change password response:", res.data);
  return res.data;
}

/**
 * POST /api/auth/validate
 * Sends Bearer token in header — returns boolean
 */
export async function validateTokenAPI() {
  const res = await apiClient.post("/api/auth/validate");
  console.log("Validate token response:", res.data);
  return res.data; // true or false
}

/**
 * POST /api/auth/logout
 */
export async function logoutAPI() {
  const res = await apiClient.post("/api/auth/logout");
  console.log("Logout response:", res.data);
  return res.data;
}

export async function forgotPasswordAPI(email) {
  const res = await apiClient.post("/api/auth/forgot-password", { email });
  return res.data;
}

export async function resetPasswordAPI(email, otp, newPassword) {
  const res = await apiClient.post("/api/auth/reset-password", { email, otp, newPassword });
  return res.data;
}