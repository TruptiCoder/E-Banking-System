package com.bank.fund.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.fund.dto.AccountResponseDTO;
import com.bank.fund.dto.FundTransferRequestDTO;
import com.bank.fund.dto.FundTransferResponseDTO;
import com.bank.fund.dto.TransferStatusDTO;
import com.bank.fund.entity.FundTransferEntity;
import com.bank.fund.kafka.FundTransferProducer;
import com.bank.fund.repository.FundTransferRepository;

import lombok.RequiredArgsConstructor;
  
@Service
@RequiredArgsConstructor
public class FundTransferService {

    private final AccountValidationService validationService;
    private final FundTransferRepository repository;
    private final FundTransferProducer producer;

    public FundTransferResponseDTO initiateTransfer(FundTransferRequestDTO request) {

        AccountResponseDTO source =
                validationService.getAccount(request.getSourceAccountId());

        AccountResponseDTO destination =
                validationService.getAccount(request.getDestinationAccountId());

        if (!"ACTIVE".equals(source.getStatus())) {
            throw new RuntimeException("Source account inactive");
        }

        if (!"ACTIVE".equals(destination.getStatus())) {
            throw new RuntimeException("Destination account inactive");
        }

        if(source.getBalance().compareTo(request.getAmount()) < 0){
            throw new RuntimeException("Insufficient balance");
        }

        FundTransferEntity transfer = new FundTransferEntity();

        transfer.setSourceAccountId(request.getSourceAccountId());
        transfer.setDestinationAccountId(request.getDestinationAccountId());
        transfer.setAmount(request.getAmount());
        transfer.setStatus("PENDING");
        transfer.setTransactionPasswordVerified(true);
        transfer.setCreatedAt(LocalDateTime.now());

        FundTransferEntity saved = repository.save(transfer);

        producer.publishTransferEvent(saved);

        return new FundTransferResponseDTO(
                saved.getTransferId(),
                saved.getStatus(),
                saved.getAmount(),
                saved.getCreatedAt()
        );
    }

    public TransferStatusDTO getTransferStatus(Long transferId) {

        FundTransferEntity transfer = repository.findById(transferId)
                .orElseThrow(() -> new RuntimeException("Transfer not found"));

        return new TransferStatusDTO(
                transfer.getTransferId(),
                transfer.getStatus()
        );
    }

    public List<FundTransferResponseDTO> getTransferHistory(Long customerId) {

        List<AccountResponseDTO> accounts =
                validationService.getCustomerAccounts(customerId);

        List<Long> accountIds = accounts.stream()
                .map(AccountResponseDTO::getAccountId)
                .toList();

        List<FundTransferEntity> transfers =
                repository.findBySourceAccountIdInOrDestinationAccountIdIn(
                        accountIds,
                        accountIds
                );

        return transfers.stream()
                .map(t -> new FundTransferResponseDTO(
                        t.getTransferId(),
                        t.getStatus(),
                        t.getAmount(),
                        t.getCreatedAt()
                ))
                .toList();
    }
}