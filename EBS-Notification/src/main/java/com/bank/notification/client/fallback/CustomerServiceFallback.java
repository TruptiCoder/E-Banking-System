package com.bank.notification.client.fallback;

import com.bank.notification.client.CustomerServiceClient;
import com.bank.notification.dto.external.CustomerDTO;
import com.bank.notification.dto.external.CustomerResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class CustomerServiceFallback implements CustomerServiceClient {

    @Override
    public CustomerResponseDTO getCustomerById(Long customerId) {

        CustomerDTO fallbackCustomer = new CustomerDTO();
        fallbackCustomer.setCustomerId(customerId);
        fallbackCustomer.setUsername("Unknown Customer");
        fallbackCustomer.setEmail("support@bank.com");

        CustomerResponseDTO response = new CustomerResponseDTO();
        response.setCustomerDTO(fallbackCustomer);
        response.setMessage("Fallback customer response");

        return response;
    }
}