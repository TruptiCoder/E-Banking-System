import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { changePasswordAPI } from "../../services/authService";

export default function UpdatePassword() {
  const { auth } = useAuth();

  const [oldPass,  setOldPass]  = useState("");
  const [newPass,  setNewPass]  = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!oldPass || !newPass || !confirm) { setError("Please fill all fields."); return; }
    if (newPass !== confirm) { setError("New password and confirmation do not match."); return; }
    if (newPass.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (newPass === oldPass) { setError("New password must be different from current password."); return; }
    setLoading(true);
    try {
      await changePasswordAPI(auth.customerId, oldPass, newPass);
      setSuccess("Password changed successfully. Please use your new password next time you log in.");
      setOldPass(""); setNewPass(""); setConfirm("");
      setTimeout(() => setSuccess(""), 6000);
    } catch { setError("Could not change password. Please check your current password."); }
    finally { setLoading(false); }
  }

  const fields = [
    { label: "Current Password",     val: oldPass, set: setOldPass, ph: "Your current password"  },
    { label: "New Password",          val: newPass, set: setNewPass, ph: "At least 8 characters"  },
    { label: "Confirm New Password",  val: confirm, set: setConfirm, ph: "Re-enter new password"  },
  ];

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4" style={{ color: "#543622" }}>Change Password</h2>

      <div className="page-card p-4" style={{ maxWidth: 440 }}>
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div key={f.label} className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock" /></span>
                <input className="form-control" type="password" placeholder={f.ph} value={f.val} onChange={(e) => f.set(e.target.value)} />
              </div>
            </div>
          ))}

          {error   && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: 13 }}>{error}</div>}
          {success && <div className="alert alert-success py-2 mb-3" style={{ fontSize: 13, lineHeight: 1.5 }}>{success}</div>}

          <button className="btn btn-primary w-100 fw-bold py-3 mb-4" type="submit" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2" />Updating...</> : <><i className="bi bi-shield-check me-2" />Update Password</>}
          </button>
        </form>

        <div className="border-top pt-3">
          <p className="fw-semibold mb-2" style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Password Requirements
          </p>
          {[
            "Minimum 8 characters",
            "Must be different from current password",
            "Last 5 passwords cannot be reused (enforced by server)",
          ].map((r) => (
            <p key={r} className="text-muted mb-1" style={{ fontSize: 12 }}>
              <i className="bi bi-dot me-1" />{r}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
