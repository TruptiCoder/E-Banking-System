import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateFormatter";

const TYPE_CONFIG = {
  CREDIT:         { label:"Credit",       color:"#16a34a", bg:"#dcfce7", sign:"+" },
  DEBIT:          { label:"Debit",        color:"#dc2626", bg:"#fee2e2", sign:"−" },
  TRANSFER_IN:    { label:"Transfer In",  color:"#16a34a", bg:"#dcfce7", sign:"+" },
  TRANSFER_OUT:   { label:"Transfer Out", color:"#dc2626", bg:"#fee2e2", sign:"−" },
  ATM_WITHDRAWAL: { label:"ATM",          color:"#dc2626", bg:"#fee2e2", sign:"−" },
  FD_DEBIT:       { label:"FD Debit",     color:"#d97706", bg:"#fef3c7", sign:"−" },
};
const ICONS = {
  CREDIT:"bi-arrow-down-circle-fill", TRANSFER_IN:"bi-arrow-down-circle-fill",
  DEBIT:"bi-arrow-up-circle-fill",    TRANSFER_OUT:"bi-arrow-up-circle-fill",
  ATM_WITHDRAWAL:"bi-building-fill",  FD_DEBIT:"bi-safe2",
};

export default function TransactionRow({ txn, clickable=false, onClick }) {
  const cfg  = TYPE_CONFIG[txn.transactionType] || { label:txn.transactionType, color:"#8F7265", bg:"#f5ede8", sign:"" };
  const icon = ICONS[txn.transactionType] || "bi-arrow-left-right";
  return (
    <tr style={{ cursor: clickable?"pointer":"default", transition:"background 0.12s" }} onClick={onClick}
      onMouseEnter={clickable?(e)=>(e.currentTarget.style.background="#fdf8f5"):undefined}
      onMouseLeave={clickable?(e)=>(e.currentTarget.style.background=""):undefined}>
      <td style={{ padding:"13px 16px", width:48 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", color:cfg.color, fontSize:16 }}>
          <i className={`bi ${icon}`} />
        </div>
      </td>
      <td>
        <p style={{ fontSize:13.5, fontWeight:600, color:"#543622", margin:"0 0 2px" }}>{txn.description}</p>
        <p style={{ fontSize:11.5, color:"#8F7265", margin:0 }}>{formatDate(txn.createdAt)}</p>
      </td>
      <td style={{ textAlign:"center" }}>
        <span className="txn-badge" style={{ color:cfg.color, backgroundColor:cfg.bg }}>{cfg.label}</span>
      </td>
      <td style={{ textAlign:"right", minWidth:150 }}>
        <p style={{ fontSize:14, fontWeight:700, color:cfg.color, margin:"0 0 2px" }}>{cfg.sign} {formatCurrency(txn.amount)}</p>
        <p className="font-mono" style={{ fontSize:10.5, color:"#8F7265", margin:0 }}>Bal: {formatCurrency(txn.balanceAfter)}</p>
      </td>
      {clickable && <td style={{ width:36, paddingRight:16 }}><i className="bi bi-chevron-right" style={{ fontSize:11, color:"#C9ADA7" }} /></td>}
    </tr>
  );
}
