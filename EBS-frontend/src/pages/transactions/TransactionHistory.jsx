import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAccountsAPI } from "../../services/accountService";
import { getTransactionsAPI } from "../../services/transactionService";
import TransactionTable from "../../components/transaction/TransactionTable";
import Loader from "../../components/common/Loader";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionHistory() {
  const { auth } = useAuth();
  const [accounts,     setAccounts]     = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accountId,    setAccountId]    = useState("");
  const [txnType,      setTxnType]      = useState("");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");

  useEffect(() => {
    getAccountsAPI(auth.customerId).then((data) => {
      setAccounts(data);
      if (data.length > 0) setAccountId(data[0].accountId);
    });
  }, [auth.customerId]);

  useEffect(() => {
    if (!accountId) return;
    setLoading(true); setError("");
    getTransactionsAPI(accountId, { type: txnType || undefined })
      .then((data) => setTransactions(data.content ?? data))
      .catch(() => setError("Could not load transactions."))
      .finally(() => setLoading(false));
  }, [accountId, txnType]);

  const credits     = transactions.filter((t) => ["CREDIT","TRANSFER_IN"].includes(t.transactionType));
  const debits      = transactions.filter((t) => !["CREDIT","TRANSFER_IN"].includes(t.transactionType));
  const totalCredit = credits.reduce((s, t) => s + t.amount, 0);
  const totalDebit  = debits.reduce((s, t)  => s + t.amount, 0);
  const net         = totalCredit - totalDebit;

  return (
    <div className="warm-page">
      <div className="warm-page-header">
        <h2 className="warm-page-title">Transaction History</h2>
        <p className="warm-page-sub">Click any row to view full transaction details.</p>
      </div>

      <div className="warm-card p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-6">
            <label className="warm-label">Account</label>
            <select className="warm-select" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              {accounts.map((a) => <option key={a.accountId} value={a.accountId}>{a.accountType} — {a.accountNumber}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="warm-label">Transaction Type</label>
            <select className="warm-select" value={txnType} onChange={(e) => setTxnType(e.target.value)}>
              <option value="">All Types</option>
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
              <option value="TRANSFER_IN">Transfer In</option>
              <option value="TRANSFER_OUT">Transfer Out</option>
              <option value="ATM_WITHDRAWAL">ATM Withdrawal</option>
              <option value="FD_DEBIT">FD Debit</option>
            </select>
          </div>
        </div>
      </div>

      {!loading && transactions.length > 0 && (
        <div className="warm-card p-3 mb-4">
          <div className="row g-0 text-center">
            {[
              { label:"Credits", value: formatCurrency(totalCredit), color:"#16a34a" },
              { label:"Debits",  value: formatCurrency(totalDebit),   color:"#dc2626" },
              { label:"Net",     value: formatCurrency(net),           color: net>=0?"#16a34a":"#dc2626" },
              { label:"Count",   value: transactions.length,           color:"#543622" },
            ].map((s, i, arr) => (
              <div key={s.label} className="col" style={{ position:"relative" }}>
                <p style={{ fontSize:10.5, fontWeight:700, color:"#8F7265", textTransform:"uppercase", letterSpacing:0.8, marginBottom:4 }}>{s.label}</p>
                <p style={{ fontSize:16, fontWeight:700, color:s.color, margin:0 }}>{s.value}</p>
                {i < arr.length-1 && <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:1, height:36, background:"#e8ddd8" }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="warm-alert warm-alert-danger mb-3">{error}</div>}
      {loading ? <Loader /> : <TransactionTable transactions={transactions} clickable />}
    </div>
  );
}
