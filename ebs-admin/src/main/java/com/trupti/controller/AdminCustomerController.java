package com.trupti.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;
import com.trupti.service.AdminCustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
public class AdminCustomerController {

	private final AdminCustomerService adminCustomerService;

	@PostMapping
	public ResponseEntity<CustomerResponse> createCustomer(@Valid @RequestBody CreateCustomerRequest request) {
		Optional<CustomerResponse> res = adminCustomerService.createCustomer(request);
		if(res.isEmpty()) return ResponseEntity.ok().body(new CustomerResponse(null, "Customer not created!"));
		return ResponseEntity.ok().body(res.get());
	}

	@GetMapping("/{customerId}")
	public ResponseEntity<CustomerResponse> getCustomer(@PathVariable Long customerId) {
		Optional<CustomerResponse> res = adminCustomerService.getCustomer(customerId);
		if(res.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomerResponse(null, "Customer not found!"));
		}
		return ResponseEntity.ok().body(res.get());
	}

	@PutMapping("/{customerId}")
	public CustomerResponse updateCustomer(@PathVariable Long customerId,
			@Valid @RequestBody CreateCustomerRequest request) {
		return adminCustomerService.updateCustomer(customerId, request);
	}

	@DeleteMapping("/{customerId}")
	public String deleteCustomer(@PathVariable Long customerId) {
		boolean res = adminCustomerService.deleteCustomer(customerId);
		return res ? "Customer Deleted Successfully!" : "Some problem occured!";
	}
}
