package com.bank.account.service;

import java.util.List;

import com.bank.account.dto.AccountResponseDTO;
import com.bank.account.dto.BalanceCheckRequest;
import com.bank.account.dto.BalanceCheckResponse;
import com.bank.account.dto.CardAuthResponse;
import com.bank.account.dto.CreateAccountRequest;
import com.bank.account.dto.CreditRequest;
import com.bank.account.dto.DebitRequest;

public interface AccountService {

	 AccountResponseDTO createAccount(CreateAccountRequest request);

	    AccountResponseDTO getAccount(Long accountId);

	    void deleteAccount(Long accountId);
	AccountResponseDTO getAccountDetail(Long accountId);
	List<AccountResponseDTO> getCustomerAccounts(Long customerId);
	BalanceCheckResponse checkBalance(BalanceCheckRequest request);
	void debitAccount(Long accountId, DebitRequest request);
	void creditAccount(Long accountId, CreditRequest request);

	AccountResponseDTO getByNumber(String accountNumber);

	CardAuthResponse authenticateCard(String accountNumber);
	
}
