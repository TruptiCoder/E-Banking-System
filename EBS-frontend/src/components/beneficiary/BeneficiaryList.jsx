export default function BeneficiaryList({ beneficiaries, onRemove }) {
  if (!beneficiaries || beneficiaries.length === 0) {
    return (
      <div className="page-card text-center py-5">
        <i className="bi bi-people text-muted" style={{ fontSize: 40 }} />
        <p className="text-muted mt-3 mb-1">No beneficiaries added yet.</p>
        <p className="text-muted mb-0" style={{ fontSize: 12 }}>Add a beneficiary to start transferring funds.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {beneficiaries.map((b) => (
        <div key={b.beneficiaryId} className="page-card p-3 d-flex align-items-center gap-3">

          {/* Avatar */}
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold"
            style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "var(--ddbp-navy)", fontSize: 18 }}
          >
            {b.beneficiaryName?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-grow-1">
            <p className="fw-semibold mb-1" style={{ fontSize: 15 }}>{b.beneficiaryName}</p>
            <p className="text-muted font-mono mb-0" style={{ fontSize: 12 }}>
              {b.accountNumber} · {b.bankName} · {b.ifscCode}
            </p>
            {b.status === "PENDING" && (
              <p className="mb-0 mt-1" style={{ fontSize: 11, color: "#f59e0b" }}>
                <i className="bi bi-hourglass-split me-1" />Activates after 12-hour cooling period
              </p>
            )}
          </div>

          {/* Badges & Actions */}
          <div className="d-flex flex-column align-items-end gap-2">
            <span className={`badge rounded-pill ${b.status === "ACTIVE" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}
              style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px" }}>
              {b.status}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              style={{ fontSize: 12, padding: "3px 12px" }}
              onClick={() => onRemove(b.beneficiaryId)}
            >
              Remove
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
