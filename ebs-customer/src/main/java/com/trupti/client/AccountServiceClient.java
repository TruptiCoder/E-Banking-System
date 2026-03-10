package com.trupti.client;

import java.util.List;
import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.trupti.vo.AccountSummaryVO;

@FeignClient(name = "EBS-ACCOUNT")
public interface AccountServiceClient {
	
	@GetMapping("/api/accounts/{customerId}")
	Optional<List<AccountSummaryVO>> getAccounts(@PathVariable Long customerId);
}
