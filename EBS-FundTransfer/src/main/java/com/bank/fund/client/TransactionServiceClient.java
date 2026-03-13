package com.bank.fund.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bank.fund.dto.TransactionRecordRequest;

@FeignClient(name = "EBS-TRANSACTION")
public interface TransactionServiceClient {

    @PostMapping("/api/transactions/record")
    Object recordTransaction(@RequestBody TransactionRecordRequest request);
}
