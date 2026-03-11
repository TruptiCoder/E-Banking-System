package com.trupti.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;

@FeignClient(
        name = "CUSTOMER-SERVICE",
        path = "/api/customers"
)
public interface CustomerServiceClient {

    /**
     * Create customer
     */
    @PostMapping
    CustomerResponse createCustomer(
            @RequestBody CreateCustomerRequest request
    );

    /**
     * Get customer by ID
     */
    @GetMapping("/{customerId}")
    CustomerResponse getCustomer(
            @PathVariable("customerId") Long customerId
    );

    /**
     * Update customer
     */
    @PutMapping("/{customerId}")
    CustomerResponse updateCustomer(
            @PathVariable("customerId") Long customerId,
            @RequestBody CreateCustomerRequest request
    );

    /**
     * Delete / disable customer
     */
    @DeleteMapping("/{customerId}")
    void deleteCustomer(
            @PathVariable("customerId") Long customerId
    );
}