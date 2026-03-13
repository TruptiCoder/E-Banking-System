import { formatCurrency } from "../../utils/formatCurrency";

export default function TransferForm({
  accounts, beneficiaries,
  fromAccount, setFromAccount,
  beneficiary, setBeneficiary,
  amount, setAmount,
  pin, setPin,
  onSubmit, loading, error, success,
  bId, setBId
}) {

  const handleBen = (e) => {
    setBeneficiary(e.target.value)
    const found = beneficiaries.find((b) => b.accountNumber === e.target.value);
    setBId(found?.beneficiaryId);
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "#374151" }}>
          From Account
        </label>
        <select className="form-select" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
          {accounts.map((a) => (
            <option key={a.accountId} value={a.accountId}>
              {a.accountType} — {a.accountNumber} ({formatCurrency(a.balance)})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "#374151" }}>
          To (Beneficiary)
        </label>
        <select className="form-select" value={beneficiary} onChange={handleBen}>
          <option value="">— Select Beneficiary —</option>
          {beneficiaries.map((b) => (
            <option key={b.beneficiaryId} value={b.accountNumber}>
              {b.beneficiaryName} — {b.accountNumber} ({b.bankName})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "#374151" }}>
          Amount (₹)
        </label>
        <div className="input-group">
          <span className="input-group-text">₹</span>
          <input
            className="form-control"
            type="number" min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "#374151" }}>
          Transaction PIN
        </label>
        <input
          className="form-control font-mono"
          type="password"
          placeholder="Password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <div className="form-text">Your transaction PIN is separate from your login password.</div>
      </div>

      {error   && <div className="alert alert-danger py-2 px-3" style={{ fontSize: 13 }}>{error}</div>}
      {success && <div className="alert alert-success py-2 px-3" style={{ fontSize: 13 }}>{success}</div>}

      <button className="btn btn-primary w-100 fw-bold" type="submit" disabled={loading} style={{ padding: "12px" }}>
        {loading ? <><span className="spinner-border spinner-border-sm me-2" />Processing...</> : <><i className="bi bi-send me-2" />Send Money</>}
      </button>
    </form>
  );
}
