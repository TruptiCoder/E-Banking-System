import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { addBeneficiaryAPI } from "../../services/beneficiaryService";

export default function AddBeneficiary() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [name,    setName]    = useState("");
  const [account, setAccount] = useState("");
  const [bank,    setBank]    = useState("");
  const [ifsc,    setIfsc]    = useState("");
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name || !account || !bank || !ifsc) { setError("Name, Account Number, Bank, and IFSC are required."); return; }
    setLoading(true);
    try {
      await addBeneficiaryAPI({ customerId: auth.customerId, beneficiaryName: name, accountNumber: account, bankName: bank, ifscCode: ifsc, email });
      navigate("/beneficiaries");
    } catch { 
      navigate("/beneficiaries");
      setError("Could not add beneficiary. Please try again."); 
    }
    finally { setLoading(false); }
  }

  const fields = [
    { label: "Full Name *",       val: name,    set: setName,    ph: "Ravi Kumar",          type: "text"  },
    { label: "Account Number *",  val: account, set: setAccount, ph: "1234567890",           type: "text"  },
    { label: "Bank Name *",       val: bank,    set: setBank,    ph: "State Bank of India",  type: "text"  },
    { label: "IFSC Code *",       val: ifsc,    set: setIfsc,    ph: "SBIN0001234",           type: "text"  },
    { label: "Email (optional)",  val: email,   set: setEmail,   ph: "ravi@email.com",        type: "email" },
  ];

  return (
    <div className="p-4">
      <div style={{ maxWidth: 500 }}>
        <button className="btn btn-link text-primary fw-semibold p-0 text-decoration-none mb-3" onClick={() => navigate("/beneficiaries")}>
          <i className="bi bi-arrow-left me-1" />Back
        </button>

        <div className="page-card p-4">
          <h2 className="fw-bold mb-2" style={{ color: "#543622" }}>Add Beneficiary</h2>

          <div className="alert mb-4 d-flex gap-2" style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: 13 }}>
            <i className="bi bi-hourglass-split mt-1 flex-shrink-0" />
            <div>
              <strong>12-Hour Cooling Period</strong>
              <p className="mb-0 mt-1">After adding a beneficiary, you must wait 12 hours before transferring funds. This prevents fraudulent transfers.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div key={f.label} className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</label>
                <input className="form-control" type={f.type} placeholder={f.ph} value={f.val} onChange={(e) => f.set(e.target.value)} />
              </div>
            ))}

            {error && <div className="alert alert-danger py-2" style={{ fontSize: 13 }}>{error}</div>}

            <button className="btn btn-primary w-100 fw-bold py-3 mt-2" type="submit" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2" />Adding...</> : <><i className="bi bi-person-plus me-2" />Add Beneficiary</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
