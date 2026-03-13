package com.bank.fund.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.fund.client.AccountServiceClient;
import com.bank.fund.dto.AccountResponseDTO;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountValidationService {

    private final AccountServiceClient accountClient;

    @CircuitBreaker(name = "accountService", fallbackMethod = "accountFallback")
    public AccountResponseDTO getAccount(Long accountId) {

        return accountClient.getAccountDetail(accountId);
    }

    @CircuitBreaker(name = "accountService", fallbackMethod = "accountsFallback")
    public List<AccountResponseDTO> getCustomerAccounts(Long customerId) {

        return accountClient.getCustomerAccounts(customerId);
    }

    public AccountResponseDTO accountFallback(Long accountId, Exception ex) {

        throw new RuntimeException("Account Service temporarily unavailable");
    }

    public List<AccountResponseDTO> accountsFallback(Long customerId, Exception ex) {

        throw new RuntimeException("Account Service temporarily unavailable");
    }

	public AccountResponseDTO getAccountByNumber(String destinationAccountId) {
		return accountClient.findByNumber(destinationAccountId);
	}
}