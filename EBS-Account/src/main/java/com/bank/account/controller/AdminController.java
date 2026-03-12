package com.bank.account.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.account.dto.AccountResponseDTO;
import com.bank.account.dto.CreateAccountRequest;
import com.bank.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AdminController {

	 private final AccountService accountService;

	    @PostMapping
	    public AccountResponseDTO createAccount(
	            @RequestBody CreateAccountRequest request) {

	        return accountService.createAccount(request);
	    }

	    // ADMIN - Get account by id
	    @GetMapping("/{accountId}")
	    public AccountResponseDTO getAccount(
	            @PathVariable Long accountId) {

	        return accountService.getAccount(accountId);
	    }

	    // ADMIN - Delete account
	    @DeleteMapping("/{accountId}")
	    public String deleteAccount(
	            @PathVariable Long accountId) {

	        accountService.deleteAccount(accountId);
	        return "Account deleted successfully";
	    }
}
