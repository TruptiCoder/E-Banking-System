package com.trupti.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.AccountResponse;
import com.trupti.dto.CreateAccountRequest;
import com.trupti.service.AdminAccountService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/accounts")
@RequiredArgsConstructor
public class AdminAccountController {

	private final AdminAccountService adminAccountService;
	
	@PostMapping
	public AccountResponse createAccount(@Valid @RequestBody CreateAccountRequest request) {
		return adminAccountService.createAccount(request);
	}

	@GetMapping("/customer/{customerId}")
	public List<AccountResponse> getCustomerAccounts(@PathVariable Long customerId) {
		return adminAccountService.getCustomerAccounts(customerId);
	}

	@GetMapping("/{accountId}")
	public AccountResponse getAccountDetails(@PathVariable Long accountId) {
		return adminAccountService.getAccountDetails(accountId);
	}

	@DeleteMapping("/{accountId}")
	public void deleteAccount(@PathVariable Long accountId) {
		adminAccountService.deleteAccount(accountId);
	}
}