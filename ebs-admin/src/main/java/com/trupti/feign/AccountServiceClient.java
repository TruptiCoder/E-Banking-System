package com.trupti.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.AccountResponse;
import com.trupti.dto.CreateAccountRequest;

import java.util.List;

@FeignClient(
        name = "ACCOUNT-SERVICE",
        path = "/api/accounts"
)
public interface AccountServiceClient {

    /**
     * Create a new account
     */
    @PostMapping
    AccountResponse createAccount(
            @RequestBody CreateAccountRequest request
    );

    /**
     * Get account details
     */
    @GetMapping("/{accountId}")
    AccountResponse getAccountDetails(
            @PathVariable("accountId") Long accountId
    );

    /**
     * Get all accounts of a customer
     */
    @GetMapping("/customer/{customerId}")
    List<AccountResponse> getCustomerAccounts(
            @PathVariable("customerId") Long customerId
    );

    /**
     * Delete / close account
     */
    @DeleteMapping("/{accountId}")
    void deleteAccount(
            @PathVariable("accountId") Long accountId
    );
}