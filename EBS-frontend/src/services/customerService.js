import apiClient from "./apiClient";

export async function getCustomerProfileAPI(customerId) {
  return (await apiClient.get(`/api/customers/${customerId}`)).data;
}

export async function updateCustomerProfileAPI(customerId, data) {
  return (await apiClient.put(`/api/customers/${customerId}/profile`, data)).data;
}

export async function createCustomerAPI(data) {
  return (await apiClient.post("/api/customers/register", data)).data;
}
