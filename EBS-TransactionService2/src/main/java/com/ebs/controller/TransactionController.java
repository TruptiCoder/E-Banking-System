package com.ebs.controller;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ebs.dto.TransactionRequestDTO;
import com.ebs.dto.TransactionResponseDTO;
import com.ebs.entity.TransactionEntity;
import com.ebs.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

	private final TransactionService transactionService;
	private final ModelMapper modelMapper;

	// 1. Record a new transaction
	@PostMapping("/record")
	public ResponseEntity<TransactionResponseDTO> saveTransaction(@RequestBody TransactionRequestDTO requestDTO) {
		TransactionEntity savedEntity = transactionService.saveTransaction(requestDTO);
		TransactionResponseDTO responseDTO = modelMapper.map(savedEntity, TransactionResponseDTO.class);
		return ResponseEntity.ok(responseDTO);
	}

	// 2. Get full history with pagination (New distinct path)
	@GetMapping("/{accountId}")
	public ResponseEntity<List<TransactionResponseDTO>> getTransactionHistory(@PathVariable Long accountId,
			@RequestParam("fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
			@RequestParam("toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate)

	{
		return ResponseEntity.ok(transactionService.getTransactionHistory(accountId, fromDate, toDate));
	}

	// 3. Mini-statement (Top 10 records)
	@GetMapping("/{accountId}/recent")
	public ResponseEntity<List<TransactionResponseDTO>> getRecentTransactions(@PathVariable Long accountId) {
		return ResponseEntity.ok(transactionService.getRecentTransactions(accountId));
	}
	
	@GetMapping("/{accountId}/history")
	public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions(@PathVariable Long accountId) {
		return ResponseEntity.ok(transactionService.getAllTransactionHistory(accountId));
	}

	// 4. Single transaction detail by ID
	@GetMapping("/getbyid/{transactionId}")
	public ResponseEntity<TransactionResponseDTO> getTransactionById(@PathVariable Long transactionId) {
		return ResponseEntity.ok(transactionService.getTransactionById(transactionId));
	}
}