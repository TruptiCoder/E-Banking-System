import apiClient from "./apiClient";
export async function getTransactionsAPI(accountId, params = {}) { return (await apiClient.get(`/api/transactions/${accountId}/history`, { params })).data; }
export async function getRecentTransactionsAPI(accountId) { return (await apiClient.get(`/api/transactions/${accountId}/recent`)).data; }
export async function getTransactionDetailAPI(transactionId) { return (await apiClient.get(`/api/transactions/${transactionId}`)).data; }
