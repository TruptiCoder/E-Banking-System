import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getBeneficiariesAPI, removeBeneficiaryAPI } from "../../services/beneficiaryService";
import BeneficiaryList from "../../components/beneficiary/BeneficiaryList";
import Loader from "../../components/common/Loader";

export default function BeneficiaryListPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");

  useEffect(() => { fetchBeneficiaries(); }, []);

  async function fetchBeneficiaries() {
    setLoading(true);
    try { setBeneficiaries(await getBeneficiariesAPI(auth.customerId)); }
    catch { setError("Could not load beneficiaries."); }
    finally { setLoading(false); }
  }

  async function handleRemove(id) {
    if (!window.confirm("Are you sure you want to remove this beneficiary?")) return;
    try {
      await removeBeneficiaryAPI(id);
      setBeneficiaries((prev) => prev.filter((b) => b.beneficiaryId !== id));
      setSuccess("Beneficiary removed successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Could not remove beneficiary."); }
  }

  const active  = beneficiaries.filter((b) => b.status === "ACTIVE").length;
  const pending = beneficiaries.filter((b) => b.status === "PENDING").length;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#543622" }}>Beneficiaries</h2>
          <p className="text-muted mb-0" style={{ fontSize: 13 }}>{active} active · {pending} pending activation</p>
        </div>
        <button className="btn btn-primary fw-bold" onClick={() => navigate("/beneficiaries/add")}>
          <i className="bi bi-plus-lg me-2" />Add Beneficiary
        </button>
      </div>

      {error   && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      {pending > 0 && (
        <div className="alert d-flex align-items-center gap-2 mb-4" style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: 13 }}>
          <i className="bi bi-hourglass-split" />
          You have {pending} beneficiar{pending > 1 ? "ies" : "y"} pending activation. Activation happens automatically after the 12-hour cooling period.
        </div>
      )}

      {loading ? <Loader /> : <BeneficiaryList beneficiaries={beneficiaries} onRemove={handleRemove} />}
    </div>
  );
}
