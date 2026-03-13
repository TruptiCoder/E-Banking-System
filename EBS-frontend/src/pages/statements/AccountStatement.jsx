import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAccountsAPI } from "../../services/accountService";
import { generateStatementAPI } from "../../services/statementService";
import { todayISO, daysAgoISO } from "../../utils/dateFormatter";

export default function AccountStatement() {
  const { auth } = useAuth();

  const [accounts,  setAccounts]  = useState([]);
  const [accountId, setAccountId] = useState("");
  const [fromDate,  setFromDate]  = useState(daysAgoISO(30));
  const [toDate,    setToDate]    = useState(todayISO());
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState("");

  useEffect(() => {
    getAccountsAPI(auth.customerId).then((data) => {
      setAccounts(data);
      if (data.length > 0) setAccountId(data[0].accountId);
    });
  }, [auth.customerId]);

  async function handleGenerate(format) {
    setError(""); setSuccess("");
    if (!fromDate || !toDate) { setError("Please select both From and To dates."); return; }
    if (new Date(fromDate) > new Date(toDate)) { setError("From date cannot be after To date."); return; }
    setLoading(true);
    try {
      const res = await generateStatementAPI({ accountId, fromDate, toDate, format });
      window.open(res.fileUrl, "_blank");
      setSuccess(`${format} statement generated. Download started.`);
      setTimeout(() => setSuccess(""), 4000);
    } catch { setError("Could not generate statement. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4" style={{ color: "#543622" }}>Account Statement</h2>

      <div className="page-card p-4" style={{ maxWidth: 540 }}>
        <p className="text-muted mb-4" style={{ fontSize: 13, lineHeight: 1.6 }}>
          Generate an official PDF or CSV statement for any date range. The statement is produced by our Statement Service and downloaded as a file.
        </p>

        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Account</label>
          <select className="form-select" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            {accounts.map((a) => <option key={a.accountId} value={a.accountId}>{a.accountType} — {a.accountNumber}</option>)}
          </select>
        </div>

        <div className="row g-3 mb-4">
          <div className="col">
            <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>From Date</label>
            <input className="form-control" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="col">
            <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>To Date</label>
            <input className="form-control" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>

        {error   && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: 13 }}>{error}</div>}
        {success && <div className="alert alert-success py-2 mb-3" style={{ fontSize: 13 }}>{success}</div>}

        <div className="d-flex gap-3 mb-4">
          <button className="btn btn-primary fw-bold flex-fill py-3" onClick={() => handleGenerate("PDF")} disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-file-earmark-pdf me-2" />Download PDF</>}
          </button>
          <button className="btn btn-outline-primary fw-bold flex-fill py-3" onClick={() => handleGenerate("CSV")} disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-filetype-csv me-2" />Download CSV</>}
          </button>
        </div>

        <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#374151" }}>
            <i className="bi bi-question-circle me-2 text-muted" />What is a Statement?
          </p>
          <p className="text-muted mb-0" style={{ fontSize: 12, lineHeight: 1.6 }}>
            An account statement is an official document showing all transactions in a date range.
            Used for loan applications, visa applications, and tax filing. Different from Transaction History which is a live screen view only.
          </p>
        </div>
      </div>
    </div>
  );
}
