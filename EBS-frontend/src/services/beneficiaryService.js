import apiClient from "./apiClient";
export async function getBeneficiariesAPI(customerId) { return (await apiClient.get(`/api/beneficiaries/${customerId}`)).data; }
export async function addBeneficiaryAPI(payload) { return (await apiClient.post("/api/beneficiaries", payload)).data; }
export async function removeBeneficiaryAPI(id) { await apiClient.delete(`/api/beneficiaries/${id}`); }
