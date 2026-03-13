import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutAPI } from "../../services/authService";

export default function Logout() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  useEffect(() => {
    async function doLogout() {
      try { await logoutAPI(); } catch {}
      finally { logout(); navigate("/login", { replace: true }); }
    }
    doLogout();
  }, [logout, navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--isabelline)",
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="loader-ring-outer" style={{ margin: "0 auto 20px" }} />
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17,
          fontWeight: 600,
          color: "var(--cafe-noir)",
          marginBottom: 6,
        }}>
          Signing you out
        </p>
        <p style={{ fontSize: 13, color: "var(--beaver)", margin: 0 }}>
          Please wait a moment...
        </p>
      </div>
    </div>
  );
}
