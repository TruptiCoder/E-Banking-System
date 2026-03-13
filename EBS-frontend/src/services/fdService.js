import apiClient from "./apiClient";
 
// GET all FDs for a customer
export async function getFDsAPI(customerId) {
  return (await apiClient.get(`/api/fd/${customerId}`)).data;
}
 
// POST create a new FD
export async function createFDAPI(payload) {
  return (await apiClient.post("/api/fd/create", payload)).data;
}
 
// PUT pre-close an FD
export async function closeFDAPI(fdId) {
  return (await apiClient.put(`/api/fd/${fdId}/close`)).data;
}