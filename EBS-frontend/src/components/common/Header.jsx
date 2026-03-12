import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const isAdmin  = auth?.roles?.includes("ROLE_ADMIN");

  return (
    <nav className="warm-header">
      <div className="warm-header-brand">
        <div className="warm-header-logo">
          <i className="bi bi-bank2" />
        </div>
        <div>
          <span className="warm-header-name">Aapli Bank</span>
          <span className="warm-header-tagline">Digital Banking</span>
        </div>
      </div>
      <div className="warm-header-right">
        {isAdmin && (
          <span className="warm-admin-badge"><i className="bi bi-shield-fill-check me-1" />Admin</span>
        )}
        <div className="warm-user-pill">
          <div className="warm-avatar">{(auth?.username || "U")[0].toUpperCase()}</div>
          <span className="warm-username">{auth?.username}</span>
        </div>
        <button className="warm-logout-btn" onClick={() => navigate("/logout")}>
          <i className="bi bi-box-arrow-right" /><span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
