import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginAPI } from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await loginAPI(username, password);
      login(data);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid username or password. Please try again.");
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
          <p className="login-subtitle">Our Banking Platform for us</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Username / Email</label>
            <div className="login-input-wrap">
              <i className="bi bi-person-fill login-field-icon" />
              <input type="text" placeholder="Enter your username" value={username}
                onChange={(e) => setUsername(e.target.value)} required autoFocus />
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="login-input-wrap">
              <i className="bi bi-lock-fill login-field-icon" />
              <input type={pwVisible ? "text" : "password"} placeholder="Enter your password"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="login-eye" onClick={() => setPwVisible(!pwVisible)}>
                <i className={`bi ${pwVisible ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: 4 }}>
            <button type="button" onClick={() => navigate("/forgot-password")}
              style={{
                background: "none", border: "none", fontSize: 12,
                color: "#725444", cursor: "pointer", textDecoration: "underline"
              }}>
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="login-error">
              <i className="bi bi-exclamation-circle-fill" />{error}
            </div>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
              : <><i className="bi bi-box-arrow-in-right me-2" />Sign In</>}
          </button>
        </form>

        <p className="login-secure-note">
          <i className="bi bi-shield-lock-fill me-1" />Secured by JWT · BCrypt · TLS
        </p>
      </div>
    </div>
  );
}
