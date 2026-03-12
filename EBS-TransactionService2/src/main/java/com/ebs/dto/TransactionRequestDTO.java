package com.ebs.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class TransactionRequestDTO {
    
    private Long accountId;
    private String transactionType;
    private BigDecimal amount;
    private String description;
    private BigDecimal balanceAfter;
}