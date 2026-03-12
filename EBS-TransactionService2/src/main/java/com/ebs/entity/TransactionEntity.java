package com.ebs.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ebs.dto.TransactionResponseDTO;

@Entity
@Table(name = "transactions") // Maps to your existing 'transactions' table
@Data // Automatically handles getters, setters, toString, etc.
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id") // Matches your PK column name
    private Long transactionId;

    @Column(name = "account_id") // Matches your FK column name
    private Long accountId;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "description")
    private String description;

    @Column(name = "reference_number")
    private String referenceNumber;

    @Column(name = "balance_after")
    private BigDecimal balanceAfter;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Optional: Pre-persist hook to set creation time automatically
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

	
}