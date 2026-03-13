package com.bank.fund.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.fund.client.AccountServiceClient;
import com.bank.fund.client.TransactionServiceClient;
import com.bank.fund.dto.AccountResponseDTO;
import com.bank.fund.dto.CreditRequest;
import com.bank.fund.dto.DebitRequest;
import com.bank.fund.dto.FundTransferRequestDTO;
import com.bank.fund.dto.FundTransferResponseDTO;
import com.bank.fund.dto.TransactionRecordRequest;
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
    private final TransactionServiceClient transactionClient;
    private final AccountServiceClient accountClient;

    public FundTransferResponseDTO initiateTransfer(FundTransferRequestDTO request) {

        AccountResponseDTO source =
                validationService.getAccount(request.getSourceAccountId());

        AccountResponseDTO destination =
                validationService.getAccountByNumber(request.getDestinationAccountId());

        if (!"ACTIVE".equals(source.getStatus())) {
            throw new RuntimeException("Source account inactive");
        }

        if (!"ACTIVE".equals(destination.getStatus())) {
            throw new RuntimeException("Destination account inactive");
        }

        if(source.getBalance().compareTo(request.getAmount()) < 0){
            throw new RuntimeException("Insufficient balance");
        }
        
        accountClient.creditAccount(destination.getAccountId(), new CreditRequest(request.getAmount()));
        accountClient.debitAccount(source.getAccountId(), new DebitRequest(request.getAmount()));
        
        FundTransferEntity transfer = new FundTransferEntity();

        transfer.setSourceAccountId(request.getSourceAccountId());
        transfer.setDestinationAccountId(destination.getAccountId());
        transfer.setAmount(request.getAmount());
        transfer.setStatus("COMPLETED");
        transfer.setTransactionPasswordVerified(true);
        transfer.setCreatedAt(LocalDateTime.now());

        FundTransferEntity saved = repository.save(transfer);

//        producer.publishTransferEvent(saved);
        TransactionRecordRequest transaction = new TransactionRecordRequest();
        transaction.setAccountId(transfer.getDestinationAccountId());
        transaction.setAmount(request.getAmount());
        transaction.setBalanceAfter(destination.getBalance().add(request.getAmount()));
        transaction.setDescription("Fund Transfer from" + request.getSourceAccountId());
        transaction.setTransactionType("TRANSFER_IN");
        transactionClient.recordTransaction(transaction);
        
        TransactionRecordRequest transaction1 = new TransactionRecordRequest();
        transaction1.setAccountId(transfer.getSourceAccountId());
        transaction1.setAmount(request.getAmount());
        transaction1.setBalanceAfter(source.getBalance().subtract(request.getAmount()));
        transaction1.setDescription("Fund Transfer to" + request.getDestinationAccountId());
        transaction1.setTransactionType("TRANSFER_OUT");
        transactionClient.recordTransaction(transaction1);

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