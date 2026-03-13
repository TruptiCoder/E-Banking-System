package com.bank.notification.client;

import com.bank.notification.client.fallback.CustomerServiceFallback;
import com.bank.notification.dto.external.CustomerDTO;
import com.bank.notification.dto.external.CustomerResponseDTO;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
		name = "EBS-CUSTOMER",
		fallback = CustomerServiceFallback.class
)
public interface CustomerServiceClient {

    @GetMapping("/api/customers/{customerId}")
    CustomerResponseDTO getCustomerById(@PathVariable Long customerId);

}