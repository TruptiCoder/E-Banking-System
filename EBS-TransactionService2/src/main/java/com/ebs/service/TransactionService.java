package com.ebs.service;

import java.time.LocalDate;
import java.util.List;

import com.ebs.dto.TransactionRequestDTO;
import com.ebs.dto.TransactionResponseDTO;
import com.ebs.entity.TransactionEntity;

public interface TransactionService {

	
	List<TransactionResponseDTO> getRecentTransactions(Long accountId);
	TransactionResponseDTO getTransactionById(Long transactionId);
	List<TransactionResponseDTO> getTransactionHistory(Long accountId, LocalDate start, LocalDate end);
	TransactionEntity saveTransaction(TransactionRequestDTO dto);
}
