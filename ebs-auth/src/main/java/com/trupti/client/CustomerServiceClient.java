package com.trupti.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.trupti.dto.CustomerResponseDTO;

@FeignClient(name = "EBS-CUSTOMER")
public interface CustomerServiceClient {
	
	@GetMapping("/api/customers/{customerId}")
	CustomerResponseDTO getCustomer(@PathVariable Long customerId);
}
