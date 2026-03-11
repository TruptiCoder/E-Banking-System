package com.trupti.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;
import com.trupti.feign.CustomerServiceClient;

@Service
@RequiredArgsConstructor
public class AdminCustomerService {

    private final CustomerServiceClient customerServiceClient;

    /**
     * Create a new customer by calling Customer Service
     */
    public CustomerResponse createCustomer(CreateCustomerRequest request) {
        return customerServiceClient.createCustomer(request);
    }

    /**
     * Get customer details
     */
    public CustomerResponse getCustomer(Long customerId) {
        return customerServiceClient.getCustomer(customerId);
    }

    /**
     * Update customer information
     */
    public CustomerResponse updateCustomer(Long customerId, CreateCustomerRequest request) {
        return customerServiceClient.updateCustomer(customerId, request);
    }

    /**
     * Delete / disable customer
     */
    public void deleteCustomer(Long customerId) {
        customerServiceClient.deleteCustomer(customerId);
    }
}
