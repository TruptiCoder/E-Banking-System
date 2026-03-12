package com.bank.statement.client;

import java.time.LocalDate;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.statement.dto.TransactionDTO;

@FeignClient(name = "EBS-TRANSACTION")
public interface TransactionServiceClient {

	@GetMapping("/api/transactions/{accountId}")
	List<TransactionDTO> getTransactions(@PathVariable Long accountId, 
			@RequestParam("fromDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate fromDate,
			
			@RequestParam("toDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate toDate);
}


