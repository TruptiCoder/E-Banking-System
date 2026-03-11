package com.trupti.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.AccountResponse;
import com.trupti.dto.CreateAccountRequest;
import com.trupti.service.AdminAccountService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/accounts")
@RequiredArgsConstructor
public class AdminCustomerController {

	private final AdminAccountService adminAccountService;

	/**
	 * Create a new bank account for a customer
	 */
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public AccountResponse createAccount(@Valid @RequestBody CreateAccountRequest request) {
		return adminAccountService.createAccount(request);
	}

	/**
	 * Get all accounts of a customer
	 */
	@GetMapping("/customer/{customerId}")
	@PreAuthorize("hasRole('ADMIN')")
	public List<AccountResponse> getCustomerAccounts(@PathVariable Long customerId) {
		return adminAccountService.getCustomerAccounts(customerId);
	}

	/**
	 * Get account details
	 */
	@GetMapping("/{accountId}")
	@PreAuthorize("hasRole('ADMIN')")
	public AccountResponse getAccountDetails(@PathVariable Long accountId) {
		return adminAccountService.getAccountDetails(accountId);
	}

	/**
	 * Delete / Close account
	 */
	@DeleteMapping("/{accountId}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteAccount(@PathVariable Long accountId) {
		adminAccountService.deleteAccount(accountId);
	}
}