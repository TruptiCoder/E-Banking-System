import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountCard({ account }) {
  const navigate = useNavigate();
  return (
    <div className="account-card" onClick={() => navigate(`/accounts/${account.accountId}`)} title="View account details">
      {/* Chip graphic */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:2.5, opacity:0.55, textTransform:"uppercase", margin:0 }}>{account.accountType}</p>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          <div style={{ width:28, height:20, borderRadius:4, background:"rgba(232,184,75,0.25)", border:"1px solid rgba(232,184,75,0.35)" }} />
          <div style={{ width:20, height:20, borderRadius:4, background:"rgba(232,184,75,0.15)", border:"1px solid rgba(232,184,75,0.2)" }} />
        </div>
      </div>

      {/* Account Number */}
      <p className="font-mono" style={{ fontSize:12.5, opacity:0.5, letterSpacing:3.5, marginBottom:14 }}>
        {account.accountNumber}
      </p>

      {/* Balance */}
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:800, letterSpacing:-0.5, marginBottom:20, color:"#fff" }}>
        {formatCurrency(account.balance)}
      </h3>

      {/* Footer row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <p style={{ fontSize:9.5, opacity:0.45, textTransform:"uppercase", letterSpacing:1, margin:0 }}>Branch</p>
          <p style={{ fontSize:12, opacity:0.65, margin:0, fontWeight:500 }}>{account.branchName}</p>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontSize:9.5, opacity:0.45, textTransform:"uppercase", letterSpacing:1, margin:0 }}>Currency</p>
          <p style={{ fontSize:12, opacity:0.65, margin:0, fontWeight:600 }}>{account.currency}</p>
        </div>
        <span style={{
          background:"rgba(16,185,129,0.18)", color:"#6ee7b7",
          fontSize:9.5, fontWeight:800, padding:"3px 9px", borderRadius:99, letterSpacing:0.5
        }}>{account.status}</span>
      </div>

      {/* Hover arrow */}
      <div style={{ position:"absolute", bottom:20, right:20, opacity:0.3, fontSize:11, transition:"opacity 0.18s" }}>
        <i className="bi bi-arrow-up-right" />
      </div>
    </div>
  );
}
