import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAccountsAPI } from "../../services/accountService";
import AccountCard from "../../components/account/AccountCard";
import AccountSummary from "../../components/account/AccountSummary";
import Loader from "../../components/common/Loader";

export default function AccountSummaryPage() {
  const { auth } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    getAccountsAPI(auth.customerId)
      .then(setAccounts)
      .catch(() => setError("Could not load accounts."))
      .finally(() => setLoading(false));
  }, [auth.customerId]);

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4" style={{ color: "#543622" }}>My Accounts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <AccountSummary accounts={accounts} />
      <div className="d-flex gap-3 flex-wrap mb-3">
        {accounts.map((acc) => <AccountCard key={acc.accountId} account={acc} />)}
      </div>
      <p className="text-muted" style={{ fontSize: 12 }}>
        <i className="bi bi-info-circle me-1" />Click on any account card to view its full transaction history.
      </p>
    </div>
  );
}
