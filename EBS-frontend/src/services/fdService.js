import apiClient from "./apiClient";
 
// GET all FDs for a customer
export async function getFDsAPI(customerId) {
  return (await apiClient.get(`/api/fixed-deposits/customer/${customerId}`)).data;
}
 
// POST create a new FD
export async function createFDAPI(payload) {
  return (await apiClient.post("/api/fixed-deposits/create", payload)).data;
}
 
// PUT pre-close an FD
export async function closeFDAPI(fdId) {
  return (await apiClient.put(`/api/fixed-deposits/${fdId}/close`)).data;
}