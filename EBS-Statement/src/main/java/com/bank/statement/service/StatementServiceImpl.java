package com.bank.statement.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.statement.client.TransactionServiceClient;
import com.bank.statement.dto.StatementRequestDTO;
import com.bank.statement.dto.StatementResponseDTO;
import com.bank.statement.dto.TransactionDTO;
import com.bank.statement.entity.Statement;
import com.bank.statement.repository.StatementRepository;
import com.bank.statement.util.StatementPdfGenerator;


@Service
public class StatementServiceImpl implements StatementService {

    @Autowired
    private StatementRepository repository;

    @Autowired
    private TransactionServiceClient transactionClient;

    @Override
    public StatementResponseDTO generateStatement(StatementRequestDTO request) {

        // 1 fetch transactions
        List<TransactionDTO> transactions =
                transactionClient.getTransactions(
                        request.getAccountId(),
                        request.getFromDate(),
                        request.getToDate());

        // 2 generate file (simulate)
        String fileUrl =
        		StatementPdfGenerator.generateStatementPdf(
                        request.getAccountId(),
                        request.getFromDate(),
                        request.getToDate(),
                        transactions);

        // 3 save statement metadata

        Statement statement = new Statement();

        statement.setAccountId(request.getAccountId());
        statement.setFromDate(request.getFromDate());
        statement.setToDate(request.getToDate());
        statement.setFileUrl(fileUrl);
        statement.setGeneratedAt(LocalDateTime.now());

        Statement saved = repository.save(statement);

        return new StatementResponseDTO(
                saved.getStatementId(),
                saved.getAccountId(),
                saved.getFromDate(),
                saved.getToDate(),
                saved.getFileUrl(),
                saved.getGeneratedAt()
        );
    }

    @Override
    public StatementResponseDTO getStatement(Long statementId) {

        Statement statement = repository.findById(statementId)
                .orElseThrow(() ->
                        new RuntimeException("Statement not found"));

        return new StatementResponseDTO(
                statement.getStatementId(),
                statement.getAccountId(),
                statement.getFromDate(),
                statement.getToDate(),
                statement.getFileUrl(),
                statement.getGeneratedAt()
        );
    }
    @Override
    public byte[] downloadStatement(Long accountId) throws IOException {

        Statement statement = repository.findByAccountId(accountId)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Statement not found"));

        Path path = Paths.get(statement.getFileUrl());

        return Files.readAllBytes(path);
    }
    
}
