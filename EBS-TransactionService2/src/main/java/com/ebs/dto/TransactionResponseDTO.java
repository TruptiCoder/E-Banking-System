package com.ebs.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionResponseDTO {
    
    private Long transactionId;
    private Long accountId;
    private String transactionType;
    
    // Ensures monetary values are formatted correctly
    private BigDecimal amount;
    private String description;
    private String referenceNumber;
    private BigDecimal balanceAfter;

    // Ensures dates are readable: 2026-03-11 17:32:01
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}