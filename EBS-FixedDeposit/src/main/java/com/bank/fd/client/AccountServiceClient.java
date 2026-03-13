package com.bank.fd.client;

import java.math.BigDecimal;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "EBS-ACCOUNT")
public interface AccountServiceClient {

    @PostMapping("/api/accounts/debit")
    void debitAccount(
        @RequestParam Long accountId,
        @RequestParam BigDecimal amount
    );
}
