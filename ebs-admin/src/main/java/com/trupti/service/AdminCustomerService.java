package com.trupti.service;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerResponse;
import com.trupti.feign.CustomerServiceClient;

@Service
@RequiredArgsConstructor
public class AdminCustomerService {

    private final CustomerServiceClient customerServiceClient;

    public CustomerResponse createCustomer(CreateCustomerRequest request) {
        return customerServiceClient.createCustomer(request);
    }

    public Optional<CustomerResponse> getCustomer(Long customerId) {
        CustomerResponse response = customerServiceClient.getCustomer(customerId);
        if(response.getCustomerDTO() == null) {
        		return Optional.empty();
        }
        return Optional.of(response);
    }

    public CustomerResponse updateCustomer(Long customerId, CreateCustomerRequest request) {
        return customerServiceClient.updateCustomer(customerId, request);
    }

    public boolean deleteCustomer(Long customerId) {
        return customerServiceClient.deleteCustomer(customerId);
    }
}
