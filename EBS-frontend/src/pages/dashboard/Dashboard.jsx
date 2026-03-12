import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAccountsAPI } from "../../services/accountService";
import { getRecentTransactionsAPI } from "../../services/transactionService";
import { getFDsAPI } from "../../services/fdService";
import AccountCard from "../../components/account/AccountCard";
import TransactionTable from "../../components/transaction/TransactionTable";
import Loader from "../../components/common/Loader";
import { formatCurrency } from "../../utils/formatCurrency";

const QUICK_ACTIONS = [
  { label: "Fund Transfer",  icon: "bi-arrow-left-right",       path: "/transfer",         bg: "#f5ede8", color: "#6B4535" },
  { label: "Beneficiaries",  icon: "bi-people-fill",            path: "/beneficiaries",    bg: "#f0ece7", color: "#8F7265" },
  { label: "Transactions",   icon: "bi-list-ul",                path: "/transactions",     bg: "#f5f0e6", color: "#9A7428" },
  { label: "Statements",     icon: "bi-file-earmark-text-fill", path: "/statements",       bg: "#ede8f0", color: "#7a6080" },
  { label: "Fixed Deposits", icon: "bi-safe2",                  path: "/deposits",         bg: "#fdf8ed", color: "#C49A3C" },
  { label: "Update Profile", icon: "bi-person-gear",            path: "/profile/update",   bg: "#ede4dc", color: "#725444" },
  { label: "Virtual ATM",    icon: "bi-building-fill",          path: "/atm",              bg: "#e8ede8", color: "#4a7a5a" },
];

export default function Dashboard() {
  const { auth }  = useAuth();
  const navigate  = useNavigate();
  const [accounts,     setAccounts]     = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fds,          setFDs]          = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");

  useEffect(() => {
    async function loadAll() {
      try {
        if (!auth.customerId) throw new Error("Customer ID not set");
        const [accs, fdData] = await Promise.all([getAccountsAPI(auth.customerId), getFDsAPI(auth.customerId)]);
        setAccounts(accs); setFDs(fdData);
        if (accs.length > 0) setTransactions(await getRecentTransactionsAPI(accs[0].accountId));
      } catch (err) { setError("Could not load dashboard: " + err.message); }
      finally { setLoading(false); }
    }
    loadAll();
  }, [auth.customerId]);

  if (loading) return <Loader message="Loading your dashboard..." />;

  const totalBalance = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  const activeFDs    = fds.filter((f) => f.status === "ACTIVE");
  const totalFD      = activeFDs.reduce((s, f) => s + f.depositAmount, 0);
  const activeAccts  = accounts.filter((a) => a.status === "ACTIVE").length;
  const h            = new Date().getHours();
  const greeting     = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="warm-page">

      {/* ── Greeting Banner ── */}
      <div className="warm-banner mb-4">
        <div>
          <p className="warm-banner-eyebrow">{greeting}</p>
          <h2 className="warm-banner-title">{auth.username} 👋</h2>
          <p className="warm-banner-date">
            {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
          </p>
        </div>
        <div style={{ textAlign:"right" }}>
          <p className="warm-banner-eyebrow">Portfolio Value</p>
          <h2 className="warm-banner-amount">{formatCurrency(totalBalance)}</h2>
          <p className="warm-banner-date">{activeAccts} active account{activeAccts!==1?"s":""}</p>
        </div>
      </div>

      {error && <div className="warm-alert warm-alert-danger mb-4"><i className="bi bi-exclamation-circle-fill" />{error}</div>}

      {/* ── Stats Row ── */}
      <div className="row g-3 mb-4">
        {[
          { label:"Active Accounts", value: activeAccts,             icon:"bi-credit-card-2-front-fill", bg:"#f5ede8",  color:"#6B4535" },
          { label:"Active FDs",      value: activeFDs.length,        icon:"bi-safe2",                    bg:"#fdf8ed",  color:"#C49A3C" },
          { label:"FD Value",        value: formatCurrency(totalFD), icon:"bi-graph-up-arrow",            bg:"#f0f8f4",  color:"#2d7a56" },
          { label:"Recent Txns",     value: transactions.length,     icon:"bi-list-ul",                  bg:"#ede8f0",  color:"#7a6080" },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-3">
            <div className="warm-stat-card">
              <div className="warm-stat-icon" style={{ background: s.bg, color: s.color }}>
                <i className={`bi ${s.icon}`} />
              </div>
              <div>
                <p className="warm-stat-label">{s.label}</p>
                <p className="warm-stat-value">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── My Accounts ── */}
      <div className="mb-4">
        <div className="warm-section-header">
          <span className="warm-section-title">My Accounts</span>
          <button className="warm-section-link" onClick={() => navigate("/accounts")}>
            View all <i className="bi bi-arrow-right" />
          </button>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          {accounts.map((acc) => <AccountCard key={acc.accountId} account={acc} />)}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="mb-4">
        <div className="warm-section-header">
          <span className="warm-section-title">Quick Actions</span>
        </div>
        <div className="row g-3">
          {QUICK_ACTIONS.map((a) => (
            <div key={a.path} className="col-6 col-sm-4 col-lg-3 col-xl-auto" style={{ minWidth: 115 }}>
              <button className="quick-action-btn" onClick={() => navigate(a.path)}>
                <div style={{ width:46, height:46, borderRadius:13, background:a.bg, color:a.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, transition:"transform 0.18s" }}>
                  <i className={`bi ${a.icon}`} />
                </div>
                <span style={{ fontSize:11.5, color:"var(--cafe-noir)" }}>{a.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── FD Summary ── */}
      {activeFDs.length > 0 && (
        <div className="mb-4">
          <div className="warm-section-header">
            <span className="warm-section-title">Fixed Deposits</span>
            <button className="warm-section-link" onClick={() => navigate("/deposits")}>View all <i className="bi bi-arrow-right" /></button>
          </div>
          <div className="warm-card p-4">
            <div className="row g-0 text-center">
              {[
                { label:"Total Locked",  value: formatCurrency(totalFD), color:"var(--rich-brown)" },
                { label:"Active FDs",    value: activeFDs.length,        color:"var(--gold-deep)" },
                { label:"Avg. Rate",     value: `${(activeFDs.reduce((s,f)=>s+f.interestRate,0)/activeFDs.length).toFixed(2)}% p.a.`, color:"#2d7a56" },
              ].map((item, i, arr) => (
                <div key={item.label} className="col" style={{ position:"relative" }}>
                  <p style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--beaver)", marginBottom:6 }}>{item.label}</p>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:item.color, margin:0 }}>{item.value}</p>
                  {i < arr.length-1 && <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:1, height:40, background:"var(--border-dark)" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Recent Transactions ── */}
      <div>
        <div className="warm-section-header">
          <span className="warm-section-title">Recent Transactions</span>
          <button className="warm-section-link" onClick={() => navigate("/transactions")}>View all <i className="bi bi-arrow-right" /></button>
        </div>
        <TransactionTable transactions={transactions} clickable />
      </div>

    </div>
  );
}
