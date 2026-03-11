package com.trupti.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;
import com.trupti.service.AdminCustomerService;

@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
public class AdminAccountController {

	private final AdminCustomerService adminCustomerService;

	/**
	 * Create new customer (Admin only)
	 */
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public CustomerResponse createCustomer(@Valid @RequestBody CreateCustomerRequest request) {
		return adminCustomerService.createCustomer(request);
	}

	/**
	 * Get customer details
	 */
	@GetMapping("/{customerId}")
	@PreAuthorize("hasRole('ADMIN')")
	public CustomerResponse getCustomer(@PathVariable Long customerId) {
		return adminCustomerService.getCustomer(customerId);
	}

	/**
	 * Update customer information
	 */
	@PutMapping("/{customerId}")
	@PreAuthorize("hasRole('ADMIN')")
	public CustomerResponse updateCustomer(@PathVariable Long customerId,
			@Valid @RequestBody CreateCustomerRequest request) {
		return adminCustomerService.updateCustomer(customerId, request);
	}

	/**
	 * Disable customer account
	 */
	@DeleteMapping("/{customerId}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteCustomer(@PathVariable Long customerId) {
		adminCustomerService.deleteCustomer(customerId);
	}
}
