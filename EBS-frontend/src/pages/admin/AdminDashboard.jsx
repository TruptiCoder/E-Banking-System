import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllCustomersAPI,
  createCustomerAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
} from "../../services/customerService";
import {
  getAllAccountsAPI,
  createAccountAPI,
  deleteAccountAPI,
} from "../../services/accountService";
import Loader from "../../components/common/Loader";

// ── Reusable tiny components ─────────────────────────────────
function Tabs({ tabs, active, onChange }) {
  return (
    <div className="d-flex gap-2 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          className={`warm-btn-${active === t ? "primary" : "outline"}`}
          style={{ minWidth: 120 }}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function Alert({ type, message, onClose }) {
  if (!message) return null;
  return (
    <div className={`warm-alert warm-alert-${type} mt-2 mb-3`}>
      {message}
      {onClose && (
        <button
          style={{ float: "right", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ── Customers Tab ────────────────────────────────────────────
function CustomersTab() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const empty = {
    username: "", email: "", phone: "", address: "",
    firstName: "", lastName: "", dateOfBirth: "", city: "", country: "", postalCode: "",
  };
  const [form, setForm] = useState(empty);

  async function load() {
    setLoading(true);
    try {
      setCustomers(await getAllCustomersAPI());
    } catch { setError("Failed to load customers"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function openCreate() {
    setEditId(null);
    setForm(empty);
    setShowForm(true);
  }

  function openEdit(c) {
    setEditId(c.customerId);
    setForm({
      username: c.username || "", email: c.email || "", phone: c.phone || "",
      address: c.address || "", firstName: c.firstName || "", lastName: c.lastName || "",
      dateOfBirth: c.dateOfBirth || "", city: c.city || "", country: c.country || "",
      postalCode: c.postalCode || "",
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      if (editId) {
        await updateCustomerAPI(editId, form);
        setSuccess("Customer updated!");
      } else {
        await createCustomerAPI(form);
        setSuccess("Customer created!");
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Operation failed");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this customer?")) return;
    setError(""); setSuccess("");
    try {
      await deleteCustomerAPI(id);
      setSuccess("Customer deleted!");
      load();
    } catch { setError("Delete failed"); }
  }

  if (loading) return <Loader message="Loading customers..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 style={{ margin: 0 }}>Customers ({customers.length})</h4>
        <button className="warm-btn-primary" onClick={openCreate}>
          <i className="bi bi-person-plus me-1" />New Customer
        </button>
      </div>

      <Alert type="danger" message={error} onClose={() => setError("")} />
      <Alert type="success" message={success} onClose={() => setSuccess("")} />

      {showForm && (
        <div className="warm-card mb-4 p-4">
          <h5>{editId ? "Edit Customer" : "Create Customer"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                { k: "username", label: "Username", req: true },
                { k: "email", label: "Email", type: "email", req: true },
                { k: "phone", label: "Phone", req: true },
                { k: "firstName", label: "First Name", req: true },
                { k: "lastName", label: "Last Name", req: true },
                { k: "dateOfBirth", label: "Date of Birth", type: "date" },
                { k: "address", label: "Address" },
                { k: "city", label: "City" },
                { k: "country", label: "Country" },
                { k: "postalCode", label: "Postal Code" },
              ].map(({ k, label, type = "text", req }) => (
                <div key={k} className="col-md-4">
                  <label className="form-label">{label}{req && <span style={{ color: "red" }}>*</span>}</label>
                  <input className="form-control" type={type} value={form[k]} onChange={set(k)} required={req} />
                </div>
              ))}
            </div>
            <div className="d-flex gap-2 mt-3">
              <button className="warm-btn-primary" type="submit">{editId ? "Update" : "Create"}</button>
              <button className="warm-btn-outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="warm-card p-0" style={{ overflow: "auto" }}>
        <table className="table table-hover mb-0" style={{ minWidth: 700 }}>
          <thead>
            <tr style={{ background: "var(--linen)" }}>
              <th>ID</th><th>Username</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.customerId}>
                <td>{c.customerId}</td>
                <td>{c.username}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td><span className={`badge bg-${c.status === "Active" ? "success" : "secondary"}`}>{c.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openEdit(c)} title="Edit">
                    <i className="bi bi-pencil" />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.customerId)} title="Delete">
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={6} className="text-center py-4 text-muted">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Accounts Tab ─────────────────────────────────────────────
function AccountsTab() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  const empty = { customerId: "", accountType: "SAVINGS", initialDeposit: "" };
  const [form, setForm] = useState(empty);

  async function load() {
    setLoading(true);
    try {
      setAccounts(await getAllAccountsAPI());
    } catch { setError("Failed to load accounts"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleCreate(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await createAccountAPI({
        customerId: Number(form.customerId),
        accountType: form.accountType,
        initialDeposit: Number(form.initialDeposit),
      });
      setSuccess("Account created!");
      setShowForm(false);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create account");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this account?")) return;
    setError(""); setSuccess("");
    try {
      await deleteAccountAPI(id);
      setSuccess("Account deleted!");
      load();
    } catch { setError("Delete failed"); }
  }

  if (loading) return <Loader message="Loading accounts..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 style={{ margin: 0 }}>Accounts ({accounts.length})</h4>
        <button className="warm-btn-primary" onClick={() => { setForm(empty); setShowForm(true); }}>
          <i className="bi bi-plus-circle me-1" />New Account
        </button>
      </div>

      <Alert type="danger" message={error} onClose={() => setError("")} />
      <Alert type="success" message={success} onClose={() => setSuccess("")} />

      {showForm && (
        <div className="warm-card mb-4 p-4">
          <h5>Create Account</h5>
          <form onSubmit={handleCreate}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Customer ID <span style={{ color: "red" }}>*</span></label>
                <input className="form-control" type="number" value={form.customerId} onChange={set("customerId")} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Account Type</label>
                <select className="form-select" value={form.accountType} onChange={set("accountType")}>
                  <option value="SAVINGS">SAVINGS</option>
                  <option value="CURRENT">CURRENT</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Initial Deposit <span style={{ color: "red" }}>*</span></label>
                <input className="form-control" type="number" step="0.01" value={form.initialDeposit} onChange={set("initialDeposit")} required />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button className="warm-btn-primary" type="submit">Create</button>
              <button className="warm-btn-outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="warm-card p-0" style={{ overflow: "auto" }}>
        <table className="table table-hover mb-0" style={{ minWidth: 600 }}>
          <thead>
            <tr style={{ background: "var(--linen)" }}>
              <th>Account ID</th><th>Account No.</th><th>Type</th><th>Balance</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.accountId}>
                <td>{a.accountId}</td>
                <td>{a.accountNumber}</td>
                <td>{a.accountType}</td>
                <td style={{ fontWeight: 600 }}>₹{Number(a.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(a.accountId)} title="Delete">
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr><td colSpan={5} className="text-center py-4 text-muted">No accounts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ─────────────────────────────────────
export default function AdminDashboard() {
  const { auth } = useAuth();
  if (!auth?.roles?.includes("ROLE_ADMIN")) return <Navigate to="/dashboard" replace />;

  const [tab, setTab] = useState("Customers");

  return (
    <div className="warm-page">
      <div className="warm-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 className="warm-page-title" style={{ marginBottom: 0 }}>Admin Dashboard</h2>
          <span className="admin-only-badge"><i className="bi bi-shield-lock-fill me-1" />ADMIN</span>
        </div>
        <p className="warm-page-sub">Manage customers and accounts.</p>
      </div>

      <Tabs tabs={["Customers", "Accounts"]} active={tab} onChange={setTab} />

      {tab === "Customers" && <CustomersTab />}
      {tab === "Accounts" && <AccountsTab />}
    </div>
  );
}
