import apiClient from "./apiClient";
 
// GET all accounts belonging to a customer
export async function getAccountsAPI(customerId) {
  return (await apiClient.get(`/api/accounts/customer/${customerId}`)).data;
}
 
// GET single account details by accountId
export async function getAccountDetailAPI(accountId) {
  return (await apiClient.get(`/api/accounts/${accountId}`)).data;
}
 
// GET account summary by accountId
export async function getAccountSummaryAPI(accountId) {
  return (await apiClient.get(`/api/accounts/${accountId}/summary`)).data;
}
 