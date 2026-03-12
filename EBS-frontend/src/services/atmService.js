import apiClient from "./apiClient";

// 1. Card Authentication → POST /api/auth/login
// Card number maps to username
export async function atmAuthenticateCard(cardNumber) {
  const res = await apiClient.post("/api/auth/login", {
    username: cardNumber,
    password: cardNumber, // card number used as credential per TDD
  });
  return res.data; // expects { token, customerId, accountId, username, accountType }
}

// 2. PIN Verification → POST /api/auth/validate-transaction-pin
// Separate from login password
export async function atmValidatePIN(customerId, pin) {
  const res = await apiClient.post("/api/auth/validate-transaction-pin", {
    customerId,
    pin,
  });
  return res.data;
}

// 3. Balance Inquiry → GET /api/accounts/detail/{accountId}
export async function atmGetBalance(accountId) {
  const res = await apiClient.get(`/api/accounts/detail/${accountId}`);
  return res.data; // expects { balance, accountType, accountNumber, ... }
}

// 4. Cash Withdrawal → POST /api/transfers/initiate (ATM_WITHDRAWAL type)
export async function atmWithdraw({ accountId, amount, transactionPin }) {
  const res = await apiClient.post("/api/transfers/initiate", {
    sourceAccountId:     accountId,
    amount:              amount,
    transactionPassword: transactionPin,
    transactionType:     "ATM_WITHDRAWAL",
  });
  return res.data;
}

// 5. Mini Statement → GET /api/transactions/{accountId}/recent
export async function atmMiniStatement(accountId) {
  const res = await apiClient.get(`/api/transactions/${accountId}/recent`);
  return res.data; // expects array of { transactionId, description, transactionType, amount }
}

// 6. PIN Change → PUT /api/auth/change-transaction-password
export async function atmChangePIN(customerId, oldPin, newPin) {
  const res = await apiClient.put("/api/auth/change-transaction-password", {
    customerId,
    oldPassword: oldPin,
    newPassword: newPin,
  });
  return res.data;
}

// export async function atmAuthenticateCard(cardNumber) {
//   // ── MOCK ──
//   if (cardNumber === "1111111111111111") {
//     return { token: "mock", accountId: 1, customerId: 1, username: "Gauri Gadgil", accountType: "SAVINGS" };
//   }
//   throw new Error("Card not found");
//   // ── END MOCK ──

//   const res = await apiClient.post("/api/auth/login", { username: cardNumber, password: cardNumber });
//   return res.data;
// }

// export async function atmValidatePIN(customerId, pin) {
//   // ── MOCK ──
//   if (pin === "111111") return { success: true };
//   throw new Error("Wrong PIN");
//   // ── END MOCK ──

//   const res = await apiClient.post("/api/auth/validate-transaction-pin", { customerId, pin });
//   return res.data;
// }

// export async function atmGetBalance(accountId) {
//   // ── MOCK ──
//   if (accountId === 1) return { balance: 85000.00, accountType: "SAVINGS" };
//   // ── END MOCK ──

//   const res = await apiClient.get(`/api/accounts/detail/${accountId}`);
//   return res.data;
// }

// export async function atmWithdraw({ accountId, amount, transactionPin }) {
//   // ── MOCK ──
//   if (accountId === 1) return { success: true };
//   // ── END MOCK ──

//   const res = await apiClient.post("/api/transfers/initiate", { sourceAccountId: accountId, amount, transactionPassword: transactionPin, transactionType: "ATM_WITHDRAWAL" });
//   return res.data;
// }

// export async function atmMiniStatement(accountId) {
//   // ── MOCK ──
//   if (accountId === 1) return [
//     { transactionId: 1, description: "Salary Credit",    transactionType: "CREDIT",          amount: 35000 },
//     { transactionId: 2, description: "UPI - Zomato",     transactionType: "DEBIT",           amount: 450   },
//     { transactionId: 3, description: "ATM Withdrawal",   transactionType: "ATM_WITHDRAWAL",  amount: 2000  },
//     { transactionId: 4, description: "NEFT - Rent",      transactionType: "DEBIT",           amount: 12000 },
//     { transactionId: 5, description: "Interest Credit",  transactionType: "CREDIT",          amount: 250   },
//   ];
//   // ── END MOCK ──

//   const res = await apiClient.get(`/api/transactions/${accountId}/recent`);
//   return res.data;
// }

// export async function atmChangePIN(customerId, oldPin, newPin) {
//   // ── MOCK ──
//   if (oldPin === "111111") return { success: true };
//   throw new Error("Wrong current PIN");
//   // ── END MOCK ──

//   const res = await apiClient.put("/api/auth/change-transaction-password", { customerId, oldPassword: oldPin, newPassword: newPin });
//   return res.data;
// }