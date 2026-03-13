import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAccountsAPI } from "../../services/accountService";
import { getBeneficiariesAPI } from "../../services/beneficiaryService";
import { initiateTransferAPI } from "../../services/transferService";
import TransferForm from "../../components/transfer/TransferForm";

export default function FundTransfer() {
  const { auth } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [fromAccount, setFromAccount] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [bId, setBId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [accs, benfs] = await Promise.all([
          getAccountsAPI(auth.customerId),
          getBeneficiariesAPI(auth.customerId),
        ]);
        setAccounts(accs);
        setBeneficiaries(benfs.filter((b) => b.status === "ACTIVE"));
        if (accs.length > 0) setFromAccount(accs[0].accountId);
      } catch {
        setError("Could not load data.");
      }
    }
    load();
  }, [auth.customerId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!fromAccount || !beneficiary || !amount || !pin) {
      setError("Please fill all fields.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }
    setLoading(true);
    try {
      console.log(beneficiary)
      console.log(bId)
      await initiateTransferAPI({
        sourceAccountId: fromAccount,
        destinationAccountId: beneficiary,
        beneficiaryId: bId,
        amount: parseFloat(amount),
        transactionPassword: pin,
      });
      setSuccess(
        `Transfer of ₹${parseFloat(amount).toLocaleString("en-IN")} initiated successfully!`,
      );
      setAmount("");
      setPin("");
      setBeneficiary("");
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(
        msg?.includes("queued")
          ? "Transfer queued for processing. Funds not debited."
          : "Transfer failed. Check your password or account balance.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4" style={{ color: "#543622" }}>
        Fund Transfer
      </h2>

      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-6">
          <div className="page-card p-4">
            <TransferForm
              accounts={accounts}
              beneficiaries={beneficiaries}
              fromAccount={fromAccount}
              setFromAccount={setFromAccount}
              beneficiary={beneficiary}
              setBeneficiary={setBeneficiary}
              amount={amount}
              setAmount={setAmount}
              pin={pin}
              setPin={setPin}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              success={success}
              bId={bId}
              setBId={setBId}
            />
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="p-4 rounded-3"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd" }}
          >
            <h6 className="fw-bold mb-3" style={{ color: "#0369a1" }}>
              <i className="bi bi-info-circle me-2" />
              Transfer Info
            </h6>
            {[
              "Only ACTIVE beneficiaries are shown",
              "Transaction password is separate from login password",
              "Password can be alphanumeric (min. 4 characters)",
              "Transfers are processed instantly",
              "You will receive SMS + Email confirmation",
              "Max 3 retries on failure (circuit breaker)",
            ].map((item) => (
              <div
                key={item}
                className="d-flex gap-2 py-2 border-bottom border-info border-opacity-25"
              >
                <i
                  className="bi bi-check-circle-fill text-success mt-1 flex-shrink-0"
                  style={{ fontSize: 13 }}
                />
                <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
