package com.bank.fund.client;

import java.util.List;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bank.fund.dto.AccountResponseDTO;
import com.bank.fund.dto.BalanceCheckRequest;
import com.bank.fund.dto.BalanceCheckResponse;
import com.bank.fund.dto.CreditRequest;
import com.bank.fund.dto.DebitRequest;

@FeignClient(name = "EBS-ACCOUNT", path = "/api/accounts")
public interface AccountServiceClient {

    @GetMapping("/detail/{accountId}")
    AccountResponseDTO getAccountDetail(
            @PathVariable("accountId") Long accountId);

    @GetMapping("/customer/{customerId}")
    List<AccountResponseDTO> getCustomerAccounts(
            @PathVariable("customerId") Long customerId
    );
    
    @GetMapping("/getbynumber/{accountNumber}")
	AccountResponseDTO findByNumber(@PathVariable String accountNumber);
    
    @PostMapping("/balance-check")
	public BalanceCheckResponse checkBalance(@RequestBody BalanceCheckRequest request);

	@PutMapping("/{accountId}/debit")
	public void debitAccount(@PathVariable Long accountId, @RequestBody DebitRequest request);

	@PutMapping("/{accountId}/credit")
	public void creditAccount(@PathVariable Long accountId, @RequestBody CreditRequest request);
}