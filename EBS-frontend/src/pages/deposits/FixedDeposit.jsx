import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getFDsAPI, createFDAPI, closeFDAPI } from "../../services/fdService";
import { getAccountsAPI } from "../../services/accountService";
import Loader from "../../components/common/Loader";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FixedDeposit() {
  const { auth } = useAuth();

  const [fds,      setFDs]      = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  const [fdAccount, setFdAccount] = useState("");
  const [amount,    setAmount]    = useState("");
  const [fdType,    setFdType]    = useState("REINVESTMENT");
  const [tenure,    setTenure]    = useState("12");

  useEffect(() => {
    async function load() {
      try {
        const [fdData, accData] = await Promise.all([getFDsAPI(auth.customerId), getAccountsAPI(auth.customerId)]);
        setFDs(fdData); setAccounts(accData);
        if (accData.length > 0) setFdAccount(accData[0].accountId);
      } catch { setError("Could not load fixed deposit data."); }
      finally { setLoading(false); }
    }
    load();
  }, [auth.customerId]);

  async function handleCreate(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!amount || parseFloat(amount) < 1000) { setError("Minimum deposit amount is ₹1,000."); return; }
    try {
      await createFDAPI({ customerId: auth.customerId, accountId: fdAccount, depositAmount: parseFloat(amount), depositType: fdType, tenureMonths: parseInt(tenure) });
      setSuccess("Fixed Deposit created successfully!");
      setShowForm(false); setAmount("");
      setFDs(await getFDsAPI(auth.customerId));
      setTimeout(() => setSuccess(""), 4000);
    } catch { setError("Could not create FD. Please try again."); }
  }

  async function handleClose(fdId) {
    if (!window.confirm("Pre-closing an FD may incur a penalty. Are you sure?")) return;
    try {
      await closeFDAPI(fdId);
      setFDs((prev) => prev.map((f) => f.fdId === fdId ? { ...f, status: "PREMATURE_CLOSED" } : f));
      setSuccess("FD pre-closed successfully.");
      setTimeout(() => setSuccess(""), 4000);
    } catch { setError("Could not close FD."); }
  }

  function getProgress(fd) {
    const today = new Date(), start = new Date(fd.startDate), end = new Date(fd.maturityDate);
    return Math.min(Math.max(((today - start) / (end - start)) * 100, 0), 100);
  }

  function getDaysRemaining(maturityDate) {
    return Math.max(0, Math.ceil((new Date(maturityDate) - new Date()) / 86400000));
  }

  const projectedMaturity = amount && tenure
    ? parseFloat(amount) + (parseFloat(amount) * 7.0 * (parseInt(tenure) / 12)) / 100
    : null;

  if (loading) return <Loader />;

  const activeFDs = fds.filter((f) => f.status === "ACTIVE");
  const totalLocked = activeFDs.reduce((s, f) => s + f.depositAmount, 0);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#543622" }}>Fixed Deposits</h2>
          <p className="text-muted mb-0" style={{ fontSize: 13 }}>{activeFDs.length} Active · {formatCurrency(totalLocked)} Total Locked</p>
        </div>
        <button className={`btn fw-bold ${showForm ? "btn-outline-secondary" : "btn-primary"}`}
          onClick={() => { setShowForm(!showForm); setError(""); }}>
          {showForm ? "Cancel" : <><i className="bi bi-plus-lg me-2" />Open New FD</>}
        </button>
      </div>

      {error   && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      {/* Create Form */}
      {showForm && (
        <div className="page-card p-4 mb-4">
          <h5 className="fw-bold mb-3" style={{ color: "#543622" }}>New Fixed Deposit</h5>
          <form onSubmit={handleCreate}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Source Account</label>
                <select className="form-select" value={fdAccount} onChange={(e) => setFdAccount(e.target.value)}>
                  {accounts.map((a) => <option key={a.accountId} value={a.accountId}>{a.accountType} — {a.accountNumber}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Deposit Amount (min ₹1,000)</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input className="form-control" type="number" min="1000" placeholder="50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Payout Type</label>
                <select className="form-select" value={fdType} onChange={(e) => setFdType(e.target.value)}>
                  <option value="REINVESTMENT">Reinvestment (Compounded)</option>
                  <option value="MONTHLY_PAYOUT">Monthly Payout</option>
                  <option value="QUARTERLY_PAYOUT">Quarterly Payout</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Tenure</label>
                <select className="form-select" value={tenure} onChange={(e) => setTenure(e.target.value)}>
                  {["3","6","12","24","36","60"].map((t) => <option key={t} value={t}>{t} months</option>)}
                </select>
              </div>
            </div>

            {projectedMaturity && (
              <div className="d-flex justify-content-between align-items-center p-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: 13, color: "#166534" }}>
                <span><i className="bi bi-calculator me-2" />Projected Maturity Value (est. 7% p.a.)</span>
                <strong>{formatCurrency(projectedMaturity)}</strong>
              </div>
            )}

            <button className="btn btn-primary fw-bold px-4" type="submit">
              <i className="bi bi-lock me-2" />Create Fixed Deposit
            </button>
          </form>
        </div>
      )}

      {/* FD Cards */}
      {fds.length === 0 ? (
        <div className="page-card text-center py-5">
          <i className="bi bi-safe2 text-muted" style={{ fontSize: 40 }} />
          <p className="text-muted mt-3">No fixed deposits found.</p>
        </div>
      ) : (
        fds.map((fd) => {
          const progress = getProgress(fd);
          const daysLeft = getDaysRemaining(fd.maturityDate);
          return (
            <div key={fd.fdId} className="page-card p-4 mb-3">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{fd.depositType.replace(/_/g, " ")}</p>
                  <h4 className="fw-bold mb-0" style={{ color: "#543622" }}>{formatCurrency(fd.depositAmount)}</h4>
                </div>
                <div className="text-end">
                  <p className="fw-bold mb-2" style={{ fontSize: 16, color: "#725444" }}>{fd.interestRate}% p.a.</p>
                  <span className={`badge rounded-pill ${
                    fd.status === "ACTIVE" ? "bg-success-subtle text-success" :
                    fd.status === "MATURED" ? "bg-primary-subtle text-primary" :
                    "bg-secondary-subtle text-secondary"
                  }`} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px" }}>
                    {fd.status}
                  </span>
                </div>
              </div>

              <div className="fd-progress mb-2">
                <div className="fd-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="d-flex justify-content-between text-muted mb-3" style={{ fontSize: 12 }}>
                <span>Start: {fd.startDate}</span>
                <span className="fw-semibold text-primary">
                  {fd.status === "ACTIVE" ? `${daysLeft} days remaining` : `${Math.round(progress)}% elapsed`}
                </span>
                <span>Maturity: {fd.maturityDate}</span>
              </div>

              {fd.status === "ACTIVE" && (
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary">View Details</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleClose(fd.fdId)}>Pre-close FD</button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
