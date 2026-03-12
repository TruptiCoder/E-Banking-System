package com.ebs.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ebs.dto.AccountResponse;

@FeignClient(name = "EBS-ACCOUNT")
public interface AccountClient {

    @GetMapping("/api/accounts/detail/{accountId}")
    AccountResponse existsByAccountId(@PathVariable("accountId") Long accountId);
}
