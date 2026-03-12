package com.bank.account.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.account.dto.AccountResponseDTO;
import com.bank.account.dto.BalanceCheckRequest;
import com.bank.account.dto.BalanceCheckResponse;
import com.bank.account.dto.CreateAccountRequest;
import com.bank.account.dto.CreditRequest;
import com.bank.account.dto.DebitRequest;
import com.bank.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

	 private final AccountService accountService;

	   
    
    @GetMapping("/customer/{customerId}")
    public List<AccountResponseDTO> getCustomerAccounts(
            @PathVariable Long customerId) {

        return accountService.getCustomerAccounts(customerId);
    }

    @GetMapping("/detail/{accountId}")
    public AccountResponseDTO getAccountDetail(
            @PathVariable Long accountId) {

        return accountService.getAccountDetail(accountId);
    }

    @PostMapping("/balance-check")
    public BalanceCheckResponse checkBalance(
            @RequestBody BalanceCheckRequest request) {

        return accountService.checkBalance(request);
    }

    @PutMapping("/{accountId}/debit")
    public void debitAccount(
            @PathVariable Long accountId,
            @RequestBody DebitRequest request) {

        accountService.debitAccount(accountId, request);
    }

    @PutMapping("/{accountId}/credit")
    public void creditAccount(
            @PathVariable Long accountId,
            @RequestBody CreditRequest request) {

        accountService.creditAccount(accountId, request);
    }
}