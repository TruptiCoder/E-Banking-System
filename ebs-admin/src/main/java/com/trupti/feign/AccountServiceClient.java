package com.trupti.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.trupti.dto.AccountResponse;
import com.trupti.dto.CreateAccountRequest;

import java.util.List;

@FeignClient(name = "EBS-ACCOUNT", path = "/api/accounts")
public interface AccountServiceClient {

	@PostMapping
	AccountResponse createAccount(@RequestBody CreateAccountRequest request);

	@GetMapping("/{accountId}")
	AccountResponse getAccountDetails(@PathVariable("accountId") Long accountId);

	@GetMapping("/customer/{customerId}")
	List<AccountResponse> getCustomerAccounts(@PathVariable("customerId") Long customerId);

	@DeleteMapping("/{accountId}")
	void deleteAccount(@PathVariable("accountId") Long accountId);
}