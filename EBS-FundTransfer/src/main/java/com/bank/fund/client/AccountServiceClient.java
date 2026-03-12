package com.bank.fund.client;

import java.util.List;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bank.fund.dto.AccountResponseDTO;

@FeignClient(name = "EBS-ACCOUNT")
public interface AccountServiceClient {

    @GetMapping("/api/accounts/detail/{accountId}")
    AccountResponseDTO getAccountDetail(
            @PathVariable("accountId") Long accountId);

    @GetMapping("/api/accounts/customer/{customerId}")
    List<AccountResponseDTO> getCustomerAccounts(
            @PathVariable("customerId") Long customerId
    );
}