package com.bank.beneficiary.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bank.beneficiary.vo.CustomerResponseVO;

@FeignClient(name = "EBS-CUSTOMER")
public interface CustomerServiceClient {

    @GetMapping("/api/customers/{customerId}")
    CustomerResponseVO getCustomer(@PathVariable("customerId") Long customerId);
}
