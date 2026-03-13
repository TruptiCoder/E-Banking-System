import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI, resetPasswordAPI } from "../../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step,        setStep]        = useState(1); // 1=email, 2=otp+newpass
  const [email,       setEmail]       = useState("");
  const [otp,         setOtp]         = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState("");

  // Step 1 — send OTP
  async function handleSendOTP(e) {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email."); return; }
    setLoading(true);
    try {
      await forgotPasswordAPI(email);
      setSuccess("OTP sent to your registered email.");
      setStep(2);
    } catch {
      setError("Email not found or could not send OTP.");
    } finally { setLoading(false); }
  }

  // Step 2 — reset password
  async function handleResetPassword(e) {
    e.preventDefault();
    setError("");
    if (!otp || !newPassword || !confirm) { setError("Please fill all fields."); return; }
    if (newPassword !== confirm) { setError("Passwords do not match."); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await resetPasswordAPI(email, otp, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2500);
    } catch {
      setError("Invalid or expired OTP. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="login-page">
      <div className="login-blob blob-1" />
      <div className="login-blob blob-2" />
      <div className="login-blob blob-3" />

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo-ring">
            <i className="bi bi-bank2" />
          </div>
          <h1 className="login-title">Aapli Bank</h1>
          <p className="login-subtitle">
            {step === 1 ? "Reset your password" : "Enter OTP & new password"}
          </p>
        </div>

        {/* Step 1 — Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="login-form">
            <div className="login-field">
              <label>Registered Email</label>
              <div className="login-input-wrap">
                <i className="bi bi-envelope-fill login-field-icon" />
                <input
                  type="email" placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoFocus
                />
              </div>
            </div>

            {error   && <div className="login-error"><i className="bi bi-exclamation-circle-fill" />{error}</div>}
            {success && <div className="login-error" style={{ background: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" }}><i className="bi bi-check-circle-fill" />{success}</div>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Sending OTP...</>
                : <><i className="bi bi-send me-2" />Send OTP</>}
            </button>
          </form>
        )}

        {/* Step 2 — OTP + New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="login-form">
            <div className="login-field">
              <label>OTP</label>
              <div className="login-input-wrap">
                <i className="bi bi-shield-lock-fill login-field-icon" />
                <input
                  type="text" placeholder="Enter OTP from email"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  required autoFocus maxLength={6}
                />
              </div>
            </div>

            <div className="login-field">
              <label>New Password</label>
              <div className="login-input-wrap">
                <i className="bi bi-lock-fill login-field-icon" />
                <input
                  type="password" placeholder="At least 8 characters"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Confirm New Password</label>
              <div className="login-input-wrap">
                <i className="bi bi-lock-fill login-field-icon" />
                <input
                  type="password" placeholder="Re-enter new password"
                  value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            {error   && <div className="login-error"><i className="bi bi-exclamation-circle-fill" />{error}</div>}
            {success && <div className="login-error" style={{ background: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" }}><i className="bi bi-check-circle-fill" />{success}</div>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Resetting...</>
                : <><i className="bi bi-check-circle me-2" />Reset Password</>}
            </button>

            <button type="button" className="login-btn"
              style={{ background: "transparent", color: "#725444", border: "1px solid #e0d4ce", marginTop: 8 }}
              onClick={() => { setStep(1); setError(""); setSuccess(""); }}
            >
              <i className="bi bi-arrow-left me-2" />Back
            </button>
          </form>
        )}

        {/* Back to login */}
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#8F7265" }}>
          Remember your password?{" "}
          <button type="button" onClick={() => navigate("/login")}
            style={{ background: "none", border: "none", color: "#725444", fontWeight: 600, cursor: "pointer", padding: 0 }}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}