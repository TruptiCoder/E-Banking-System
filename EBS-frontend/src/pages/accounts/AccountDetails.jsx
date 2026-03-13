import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountDetailAPI } from "../../services/accountService";
import { getTransactionsAPI } from "../../services/transactionService";
import TransactionTable from "../../components/transaction/TransactionTable";
import Loader from "../../components/common/Loader";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountDetails() {
  const { accountId } = useParams();
  const navigate      = useNavigate();

  const [account,      setAccount]      = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [acc, txnData] = await Promise.all([
          getAccountDetailAPI(accountId),
          getTransactionsAPI(accountId),
        ]);
        setAccount(acc);
        setTransactions(txnData.content ?? txnData);
      } catch { setError("Could not load account details."); }
      finally { setLoading(false); }
    }
    load();
  }, [accountId]);

  if (loading) return <Loader />;
  if (!account) return <div className="p-4"><div className="alert alert-danger">Account not found.</div></div>;

  return (
    <div className="p-4">
      <button className="btn btn-link text-primary fw-semibold p-0 text-decoration-none mb-3" onClick={() => navigate("/accounts")}>
        <i className="bi bi-arrow-left me-1" />Back to Accounts
      </button>

      {/* Detail Card */}
      <div
        className="rounded-4 p-4 mb-4 text-white"
        style={{ background: "linear-gradient(135deg, #543622 0%, #725444 100%)", boxShadow: "0 4px 20px rgba(26,86,219,0.3)" }}
      >
        <div className="row align-items-center">
          <div className="col">
            <p className="mb-1 font-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: 2, textTransform: "uppercase" }}>
              {account.accountType}
            </p>
            <p className="font-mono mb-1" style={{ fontSize: 15, letterSpacing: 3 }}>{account.accountNumber}</p>
            <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 0 }}>{account.branchName}</p>
          </div>
          <div className="col text-end">
            <p style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Current Balance</p>
            <h2 className="fw-bold mb-2" style={{ fontSize: 32 }}>{formatCurrency(account.balance)}</h2>
            <span className="badge" style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#6ee7b7", fontSize: 10, fontWeight: 700 }}>
              {account.status}
            </span>
          </div>
        </div>
        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "16px 0 12px" }} />
        <div className="d-flex gap-4" style={{ fontSize: 12, opacity: 0.65 }}>
          <span>Currency: {account.currency}</span>
          <span className="font-mono">Account ID: {account.accountId}</span>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <h5 className="fw-bold mb-3" style={{ color: "#543622" }}>Transaction History</h5>
      <TransactionTable transactions={transactions} />
    </div>
  );
}
