import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountSummary({ accounts }) {
  const total  = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  const active = accounts.filter((a) => a.status === "ACTIVE").length;
  return (
    <div className="warm-banner mb-4">
      <div>
        <p className="warm-banner-eyebrow">Total Portfolio</p>
        <h2 className="warm-banner-amount">{formatCurrency(total)}</h2>
      </div>
      <div style={{ textAlign:"right" }}>
        <p className="warm-banner-eyebrow">Accounts</p>
        <p className="warm-banner-title">{active} Active</p>
        <p className="warm-banner-date">Across all accounts</p>
      </div>
    </div>
  );
}
