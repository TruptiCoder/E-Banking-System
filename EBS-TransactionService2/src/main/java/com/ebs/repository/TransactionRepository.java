package com.ebs.repository;

import com.ebs.dto.TransactionResponseDTO;
import com.ebs.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
List<TransactionEntity> findByAccountIdAndCreatedAtBetween(Long accountId, LocalDateTime start, LocalDateTime end);
	List<TransactionEntity> findTop10ByAccountIdOrderByCreatedAtDesc(Long accountId);
	//TransactionResponseDTO getTransactionById(Long transactionId);
	Optional<TransactionEntity> findByTransactionId(Long transactionId);
}