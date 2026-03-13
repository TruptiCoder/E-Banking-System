import apiClient from "./apiClient";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Card Authentication
//    YOUR ROUTE  → POST /api/customers/authenticate-card
//    Sends card number, expects { accountId, customerId, username, accountType }
//    Backend must look up the account by accountNumber and return those fields.
// ─────────────────────────────────────────────────────────────────────────────
export async function atmAuthenticateCard(cardNumber) {
  const res = await apiClient.post("/api/accounts/authenticate-card", {
    accountNumber: cardNumber,
  });
  return res.data; // { accountId, customerId, accountType }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PIN Verification
//    YOUR ROUTE  → POST /api/customers/validate-pin
//    Sends customerId + pin. Backend checks transactionPassword field.
//    Throws on wrong PIN so the ATM can count attempts.
// ─────────────────────────────────────────────────────────────────────────────
export async function atmValidatePIN(customerId, pin) {
  const res = await apiClient.post("/api/customers/validate-pin", {
    customerId,
    pin,
  });
  return res.data; // { valid: true } or throws 401
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Balance Inquiry  ✓ WORKS AS-IS
//    YOUR ROUTE  → GET /api/accounts/detail/{accountId}   (already exists)
//    AccountResponseDTO has { accountId, accountNumber, accountType, balance }
// ─────────────────────────────────────────────────────────────────────────────
export async function atmGetBalance(accountId) {
  const res = await apiClient.get(`/api/accounts/detail/${accountId}`);
  return res.data; // { accountId, accountNumber, accountType, balance }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Cash Withdrawal  ← REMAPPED from POST /transfers/initiate
//    YOUR ROUTE  → PUT /api/accounts/{accountId}/debit   (already exists)
//    DebitRequest only needs { amount } — no PIN field in your DTO.
//    PIN was already verified in step 2, so no need to re-send it here.
//    After debiting, separately record the transaction via step 4b.
// ─────────────────────────────────────────────────────────────────────────────
export async function atmWithdraw({ accountId, amount }) {
  // Step 4a: debit the account
  await apiClient.put(`/api/accounts/${accountId}/debit`, { amount });

  // Step 4b: record the transaction (so it shows in mini-statement later)
  // YOUR ROUTE → POST /api/transactions/record  (needs to be created)
  await apiClient.post("/api/transactions/record", {
    accountId,
    transactionType: "ATM_WITHDRAWAL",
    amount,
    description:     "ATM Withdrawal",
    balanceAfter: await apiClient.get(`/api/accounts/detail/${accountId}`)
  });

  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Mini Statement
//    YOUR ROUTE  → GET /api/transactions/{accountId}/recent  (needs to be created)
//    Returns array of { transactionId, description, transactionType, amount }
//    This matches your TransactionRecordRequest fields.
// ─────────────────────────────────────────────────────────────────────────────
export async function atmMiniStatement(accountId) {
  const res = await apiClient.get(`/api/transactions/${accountId}/recent`);
  return res.data; // [{ transactionId, description, transactionType, amount }, ...]
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. PIN Change
//    YOUR ROUTE  → PUT /api/customers/change-pin  (needs to be created)
//    Sends customerId + oldPin + newPin. Backend verifies old PIN then updates.
// ─────────────────────────────────────────────────────────────────────────────
export async function atmChangePIN(customerId, oldPin, newPin) {
  const res = await apiClient.put("/api/auth/change-password", {
    customerId,
    oldPassword: oldPin,
    newPassword: newPin,
  });
  return res.data;
}


// ═════════════════════════════════════════════════════════════════════════════
// MOCKS (uncomment to test frontend without backend)
// ═════════════════════════════════════════════════════════════════════════════

// export async function atmAuthenticateCard(cardNumber) {
//   if (cardNumber === "1111111111111111")
//     return { accountId: 1, customerId: 1, username: "Gauri Gadgil", accountType: "SAVINGS" };
//   throw new Error("Card not found");
// }

// export async function atmValidatePIN(customerId, pin) {
//   if (pin === "111111") return { valid: true };
//   throw new Error("Wrong PIN");
// }

// export async function atmGetBalance(accountId) {
//   return { accountId, accountNumber: "XXXX1111", accountType: "SAVINGS", balance: 85000.00 };
// }

// export async function atmWithdraw({ accountId, amount }) {
//   return { success: true };
// }

// export async function atmMiniStatement(accountId) {
//   return [
//     { transactionId: 1, description: "Salary Credit",   transactionType: "CREDIT",         amount: 35000 },
//     { transactionId: 2, description: "UPI - Zomato",    transactionType: "DEBIT",           amount: 450   },
//     { transactionId: 3, description: "ATM Withdrawal",  transactionType: "ATM_WITHDRAWAL",  amount: 2000  },
//     { transactionId: 4, description: "NEFT - Rent",     transactionType: "DEBIT",           amount: 12000 },
//     { transactionId: 5, description: "Interest Credit", transactionType: "CREDIT",          amount: 250   },
//   ];
// }

// export async function atmChangePIN(customerId, oldPin, newPin) {
//   if (oldPin === "111111") return { success: true };
//   throw new Error("Wrong current PIN");
// }