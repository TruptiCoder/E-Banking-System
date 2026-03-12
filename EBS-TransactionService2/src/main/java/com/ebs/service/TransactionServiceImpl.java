package com.ebs.service;

import com.ebs.service.AccountClient;
import com.ebs.dto.AccountResponse;
import com.ebs.dto.TransactionRequestDTO;
import com.ebs.dto.TransactionResponseDTO;
import com.ebs.entity.TransactionEntity;
import com.ebs.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;
    private final ModelMapper modelMapper;
    private final AccountClient accountClient; // Injected Feign Client

    @Override
    @Transactional
    public TransactionEntity saveTransaction(TransactionRequestDTO dto) {
        // 1. Validate Account existence via Feign Client
        AccountResponse response = accountClient.existsByAccountId(dto.getAccountId());
        if (response == null || response.getAccountId()==null) {
            throw new RuntimeException("Transaction failed: Account ID " + dto.getAccountId() + " does not exist.");
        }

        // 2. Map, set metadata, and save
        TransactionEntity entity = modelMapper.map(dto, TransactionEntity.class);
        entity.setTransactionId(null);
        entity.setReferenceNumber(UUID.randomUUID().toString());
        entity.setCreatedAt(LocalDateTime.now());
        
        return repository.save(entity);
    }

    @Override
    public List<TransactionResponseDTO> getTransactionHistory(Long accountId, LocalDate fromDate, LocalDate toDate) {
        // 1. Get the List from the repository
    	
    	LocalDateTime  start = fromDate.atStartOfDay();
    	LocalDateTime  end = toDate.atTime(23,59,59);
    	List<TransactionEntity> entities =
                repository.findByAccountIdAndCreatedAtBetween(
                        accountId,
                        start,
                        end);

        return entities.stream()
                .map(entity -> modelMapper.map(entity, TransactionResponseDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<TransactionResponseDTO> getRecentTransactions(Long accountId) {
        // Use the stream-based mapping for List returns
        return repository.findTop10ByAccountIdOrderByCreatedAtDesc(accountId)
                         .stream()
                         .map(entity -> modelMapper.map(entity, TransactionResponseDTO.class))
                         .collect(Collectors.toList());
    }

    @Override
    public TransactionResponseDTO getTransactionById(Long transactionId) {
        // Fetch and map single result with orElseThrow
        TransactionEntity entity = repository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with ID: " + transactionId));
        
        return modelMapper.map(entity, TransactionResponseDTO.class);
    }

}