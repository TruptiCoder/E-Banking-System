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

    public AccountResponse createAccount(CreateAccountRequest request) {
        return accountServiceClient.createAccount(request);
    }

    public AccountResponse getAccountDetails(Long accountId) {
        return accountServiceClient.getAccountDetails(accountId);
    }

    public List<AccountResponse> getCustomerAccounts(Long customerId) {
        return accountServiceClient.getCustomerAccounts(customerId);
    }

    public void deleteAccount(Long accountId) {
        accountServiceClient.deleteAccount(accountId);
    }
}