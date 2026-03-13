package com.bank.account.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRecordRequest {

    private Long accountId;
    private String transactionType;
    private BigDecimal amount;
    private String description;
    private BigDecimal balanceAfter;
}
