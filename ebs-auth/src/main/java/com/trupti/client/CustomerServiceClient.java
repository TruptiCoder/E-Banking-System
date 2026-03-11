package com.trupti.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.trupti.dto.CustomerResponseDTO;

@FeignClient(name = "EBS-CUSTOMER", path = "/api/customers")
public interface CustomerServiceClient {
	
	@GetMapping("/{customerId}")
	CustomerResponseDTO getCustomer(@PathVariable Long customerId);
	
	@GetMapping("/getbyUsername/{username}")
	CustomerResponseDTO getCustomerByUsername(@PathVariable String username);
	
	@PutMapping("/{customerId}/{passwordHash}")
	boolean changePassword(@PathVariable Long customerId, @PathVariable String passwordHash);
}
