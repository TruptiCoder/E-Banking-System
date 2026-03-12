package com.trupti.service;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CredentialNotificationRequest;
import com.trupti.dto.CustomerResponse;
import com.trupti.feign.CustomerServiceClient;
import com.trupti.feign.NotificationServiceClient;

@Service
@RequiredArgsConstructor
public class AdminCustomerService {

    private final CustomerServiceClient customerServiceClient;
    private final NotificationServiceClient notificationServiceClient;

    public Optional<CustomerResponse> createCustomer(CreateCustomerRequest request) {
        CustomerResponse res = customerServiceClient.createCustomer(request);
        if(res == null) Optional.empty();
        
        CredentialNotificationRequest notificationReq = new CredentialNotificationRequest(res.getCustomerDTO().getCustomerId(), res.getCustomerDTO().getUsername(), "password");
        notificationServiceClient.sendEmail(notificationReq);
        return Optional.of(res);
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
