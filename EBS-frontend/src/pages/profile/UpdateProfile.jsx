import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCustomerProfileAPI, updateCustomerProfileAPI } from "../../services/customerService";
import Loader from "../../components/common/Loader";

const Field = ({ label, value, onChange, type = "text", placeholder = "", req = false }) => (
  <div className="warm-field">
    <label>
      {label}
      {req && <span className="req-star">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function UpdateProfile() {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "",
    address: "", city: "", country: "", postalCode: "",
  });
  const [fetching, setFetching] = useState(true);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  useEffect(() => {
    getCustomerProfileAPI(auth.customerId)
      .then((data) =>
        setForm({
          firstName:  data.profile?.firstName  || data.firstName  || "",
          lastName:   data.profile?.lastName   || data.lastName   || "",
          phone:      data.phone               || "",
          address:    data.profile?.address    || data.address    || "",
          city:       data.profile?.city       || data.city       || "",
          country:    data.profile?.country    || data.country    || "",
          postalCode: data.profile?.postalCode || data.postalCode || "",
        })
      )
      .catch(() => setError("Could not load profile."))
      .finally(() => setFetching(false));
  }, [auth.customerId]);

  // Stable change handler per field key
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.firstName || !form.lastName || !form.phone) {
      setError("First name, last name and phone are required.");
      return;
    }
    setLoading(true);
    try {
      await updateCustomerProfileAPI(auth.customerId, form);
      setSuccess("Profile updated successfully.");
      setTimeout(() => setSuccess(""), 5000);
    } catch {
      setError("Could not update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <Loader message="Loading your profile..." />;

  return (
    <div className="warm-page">
      <div className="warm-page-header">
        <h2 className="warm-page-title">Update Profile</h2>
        <p className="warm-page-sub">Keep your personal information up to date.</p>
      </div>

      <div className="warm-card" style={{ maxWidth: 560 }}>
        <form onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="warm-section-label">
            <i className="bi bi-person me-2" />Personal Information
          </div>
          <div className="row g-3 mb-1">
            <div className="col">
              <Field label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="First name" req />
            </div>
            <div className="col">
              <Field label="Last Name"  value={form.lastName}  onChange={set("lastName")}  placeholder="Last name"  req />
            </div>
          </div>
          <Field
            label="Phone Number"
            value={form.phone}
            onChange={set("phone")}
            type="tel"
            placeholder="e.g. +91 98765 43210"
            req
          />

          {/* Address */}
          <div className="warm-divider" />
          <div className="warm-section-label">
            <i className="bi bi-geo-alt me-2" />Address
          </div>
          <Field label="Street Address" value={form.address} onChange={set("address")} placeholder="Street address" />
          <div className="row g-3 mb-1">
            <div className="col">
              <Field label="City"        value={form.city}       onChange={set("city")}       placeholder="City" />
            </div>
            <div className="col">
              <Field label="Country"     value={form.country}    onChange={set("country")}    placeholder="Country" />
            </div>
            <div className="col">
              <Field label="Postal Code" value={form.postalCode} onChange={set("postalCode")} placeholder="Postal code" />
            </div>
          </div>

          {/* Feedback */}
          {error   && <div className="warm-alert warm-alert-danger  mt-3">{error}</div>}
          {success && <div className="warm-alert warm-alert-success mt-3">{success}</div>}

          {/* Submit */}
          <button className="warm-btn-primary w-100 mt-3" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
              : <><i className="bi bi-check-circle me-2" />Save Changes</>
            }
          </button>

        </form>
      </div>
    </div>
  );
}