import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createCustomerAPI } from "../../services/customerService";
import { Navigate } from "react-router-dom";

export default function CreateCustomer() {
  const { auth } = useAuth();
  if (!auth?.roles?.includes("ROLE_ADMIN")) return <Navigate to="/dashboard" replace />;

  const empty = { username:"", email:"", phone:"", address:"", firstName:"", lastName:"", dateOfBirth:"", city:"", country:"", postalCode:"", password:"" };
  const [form,    setForm]    = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    for (const k of ["username","email","phone","firstName","lastName","password"]) {
      if (!form[k].trim()) { setError(`${k.charAt(0).toUpperCase()+k.slice(1)} is required.`); return; }
    }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res = await createCustomerAPI(form);
      setSuccess(`Customer created! ID: ${res.customerId ?? res.id ?? "—"}`);
      setForm(empty);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not create customer. Username or email may already exist.");
    } finally { setLoading(false); }
  }

  const Field = ({ label, k, type="text", placeholder="", req=false }) => (
    <div className="warm-field">
      <label>{label}{req && <span className="req-star">*</span>}</label>
      <input type={type} placeholder={placeholder} value={form[k]} onChange={set(k)} />
    </div>
  );

  return (
    <div className="warm-page">
      <div className="warm-page-header">
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <h2 className="warm-page-title" style={{ marginBottom:0 }}>Create New Customer</h2>
          <span className="admin-only-badge"><i className="bi bi-shield-lock-fill me-1" />ADMIN ONLY</span>
        </div>
        <p className="warm-page-sub">Register a new customer account in the system.</p>
      </div>

      <div className="warm-card" style={{ maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <div className="warm-section-label"><i className="bi bi-key me-2" />Login Credentials</div>
          <div className="row g-3 mb-1">
            <div className="col"><Field label="Username" k="username" placeholder="e.g. john.doe@bank.com" req /></div>
            <div className="col"><Field label="Email"    k="email"    type="email" placeholder="Customer email" req /></div>
          </div>
          <Field label="Password" k="password" type="password" placeholder="Min 8 characters" req />

          <div className="warm-divider" />
          <div className="warm-section-label"><i className="bi bi-person me-2" />Personal Information</div>
          <div className="row g-3 mb-1">
            <div className="col"><Field label="First Name" k="firstName" placeholder="First name" req /></div>
            <div className="col"><Field label="Last Name"  k="lastName"  placeholder="Last name"  req /></div>
          </div>
          <Field label="Phone Number"  k="phone"       type="tel"  placeholder="e.g. +91 98765 43210" req />
          <Field label="Date of Birth" k="dateOfBirth" type="date" />
          <Field label="Address"       k="address"     placeholder="Street address" />
          <div className="row g-3 mb-1">
            <div className="col"><Field label="City"        k="city" /></div>
            <div className="col"><Field label="Country"     k="country" /></div>
            <div className="col"><Field label="Postal Code" k="postalCode" /></div>
          </div>

          {error   && <div className="warm-alert warm-alert-danger  mt-3">{error}</div>}
          {success && <div className="warm-alert warm-alert-success mt-3">{success}</div>}

          <button className="warm-btn-primary w-100 mt-3" type="submit" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2" />Creating...</> : <><i className="bi bi-person-plus me-2" />Create Customer</>}
          </button>
        </form>
      </div>
    </div>
  );
}
