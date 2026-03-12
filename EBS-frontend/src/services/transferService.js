import apiClient from "./apiClient";
export async function initiateTransferAPI(payload) { return (await apiClient.post("/api/transfers/initiate", payload)).data; }
export async function getTransferHistoryAPI(customerId) { return (await apiClient.get(`/api/transfers/history/${customerId}`)).data; }
