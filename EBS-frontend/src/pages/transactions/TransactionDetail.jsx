import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTransactionDetailAPI } from "../../services/transactionService";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateFormatter";
import Loader from "../../components/common/Loader";

const TYPE_CONFIG = {
  CREDIT:         { label: "Credit",         color: "#16a34a", bg: "#dcfce7", icon: "bi-arrow-down-circle-fill" },
  DEBIT:          { label: "Debit",          color: "#dc2626", bg: "#fee2e2", icon: "bi-arrow-up-circle-fill"   },
  TRANSFER_IN:    { label: "Transfer In",    color: "#16a34a", bg: "#dcfce7", icon: "bi-arrow-down-circle-fill" },
  TRANSFER_OUT:   { label: "Transfer Out",   color: "#dc2626", bg: "#fee2e2", icon: "bi-arrow-up-circle-fill"   },
  ATM_WITHDRAWAL: { label: "ATM Withdrawal", color: "#dc2626", bg: "#fee2e2", icon: "bi-building-fill"          },
  FD_DEBIT:       { label: "FD Debit",       color: "#d97706", bg: "#fef3c7", icon: "bi-safe2"                  },
};

function DetailRow({ label, value, mono=false }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"13px 0", borderBottom:"1px solid #f0e6e0" }}>
      <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.6, color:"#8F7265", minWidth:160 }}>{label}</span>
      <span className={mono ? "font-mono" : ""} style={{ fontSize:13.5, color:"#543622", fontWeight:500, textAlign:"right", wordBreak:"break-all" }}>
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function TransactionDetail() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [txn,     setTxn]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getTransactionDetailAPI(transactionId)
      .then(setTxn)
      .catch(() => setError("Transaction not found or could not be loaded."))
      .finally(() => setLoading(false));
  }, [transactionId]);

  if (loading) return <Loader message="Loading transaction..." />;

  return (
    <div className="warm-page">
      <button className="warm-back-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-1" />Back to Transactions
      </button>
      <h2 className="warm-page-title mb-4">Transaction Detail</h2>

      {error && <div className="warm-alert warm-alert-danger">{error}</div>}

      {txn && (() => {
        const cfg = TYPE_CONFIG[txn.transactionType] || { label: txn.transactionType, color:"#8F7265", bg:"#f5ede8", icon:"bi-arrow-left-right" };
        const isCredit = ["CREDIT","TRANSFER_IN"].includes(txn.transactionType);
        return (
          <div className="warm-card" style={{ maxWidth:560 }}>
            <div style={{ background:cfg.bg, borderRadius:12, padding:"20px 22px", marginBottom:24, display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:"white", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(84,54,34,0.12)" }}>
                <i className={`bi ${cfg.icon}`} style={{ fontSize:24, color:cfg.color }} />
              </div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:cfg.color, marginBottom:3 }}>{cfg.label}</p>
                <p style={{ fontSize:28, fontWeight:800, color:cfg.color, margin:0, letterSpacing:-0.5 }}>
                  {isCredit ? "+" : "−"} {formatCurrency(txn.amount)}
                </p>
              </div>
            </div>
            <DetailRow label="Transaction ID"   value={txn.transactionId}           mono />
            <DetailRow label="Description"      value={txn.description} />
            <DetailRow label="Type"             value={cfg.label} />
            <DetailRow label="Reference Number" value={txn.referenceNumber}         mono />
            <DetailRow label="Account ID"       value={txn.accountId}               mono />
            <DetailRow label="Balance After"    value={formatCurrency(txn.balanceAfter)} />
            <div style={{ padding:"13px 0" }}>
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.6, color:"#8F7265", minWidth:160, display:"inline-block" }}>Date & Time</span>
              <span style={{ fontSize:13.5, color:"#543622", fontWeight:500 }}>{formatDate(txn.createdAt)}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
