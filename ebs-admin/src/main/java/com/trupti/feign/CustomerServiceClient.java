package com.trupti.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;

@FeignClient(name = "EBS-CUSTOMER", path = "/api/customers")
public interface CustomerServiceClient {

	@PostMapping("/admin/register")
	CustomerResponse createCustomer(@RequestBody CreateCustomerRequest request);

	@GetMapping("/{customerId}")
	CustomerResponse getCustomer(@PathVariable Long customerId);

	@PutMapping("/admin/{customerId}")
	CustomerResponse updateCustomer(@PathVariable Long customerId,
			@RequestBody CreateCustomerRequest request);

	@DeleteMapping("/admin/{customerId}")
	boolean deleteCustomer(@PathVariable Long customerId);
}