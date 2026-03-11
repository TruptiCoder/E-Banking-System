package com.trupti.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.trupti.dto.AccountResponse;
import com.trupti.dto.CreateAccountRequest;
import com.trupti.feign.AccountServiceClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAccountService {

    private final AccountServiceClient accountServiceClient;

    /**
     * Create a new account for a customer
     */
    public AccountResponse createAccount(CreateAccountRequest request) {
        return accountServiceClient.createAccount(request);
    }

    /**
     * Get details of a specific account
     */
    public AccountResponse getAccountDetails(Long accountId) {
        return accountServiceClient.getAccountDetails(accountId);
    }

    /**
     * Get all accounts belonging to a customer
     */
    public List<AccountResponse> getCustomerAccounts(Long customerId) {
        return accountServiceClient.getCustomerAccounts(customerId);
    }

    /**
     * Delete / close an account
     */
    public void deleteAccount(Long accountId) {
        accountServiceClient.deleteAccount(accountId);
    }
}