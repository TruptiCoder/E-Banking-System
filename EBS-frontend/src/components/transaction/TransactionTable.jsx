import { useNavigate } from "react-router-dom";
import TransactionRow from "./TransactionRow";

export default function TransactionTable({ transactions, clickable=false }) {
  const navigate = useNavigate();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="warm-card d-flex flex-column align-items-center justify-content-center py-5" style={{ gap:12 }}>
        <div style={{ width:56, height:56, borderRadius:16, background:"#f5ede8", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <i className="bi bi-inbox" style={{ fontSize:26, color:"#C9ADA7" }} />
        </div>
        <p style={{ color:"#8F7265", fontWeight:500, margin:0 }}>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="warm-card overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr style={{ borderBottom:"1px solid #e8ddd8" }}>
              <th style={{ width:48, padding:"11px 16px", fontSize:10.5, fontWeight:700, color:"#C9ADA7", textTransform:"uppercase", letterSpacing:0.8, background:"#faf5f2" }} />
              <th style={{ padding:"11px 16px", fontSize:10.5, fontWeight:700, color:"#C9ADA7", textTransform:"uppercase", letterSpacing:0.8, background:"#faf5f2" }}>Description</th>
              <th className="text-center" style={{ fontSize:10.5, fontWeight:700, color:"#C9ADA7", textTransform:"uppercase", letterSpacing:0.8, background:"#faf5f2" }}>Type</th>
              <th className="text-end" style={{ padding:"11px 16px", fontSize:10.5, fontWeight:700, color:"#C9ADA7", textTransform:"uppercase", letterSpacing:0.8, background:"#faf5f2" }}>Amount / Balance</th>
              {clickable && <th style={{ width:36, background:"#faf5f2" }} />}
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <TransactionRow key={txn.transactionId} txn={txn} clickable={clickable}
                onClick={clickable ? () => navigate(`/transactions/${txn.transactionId}`) : undefined} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
