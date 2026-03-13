package com.bank.fund.dto;

import java.math.BigDecimal;

import lombok.Data;
@Data
public class FundTransferRequestDTO {

    private Long sourceAccountId;
    private String destinationAccountId;
    private Long beneficiaryId;
    private BigDecimal amount;
    private String transactionPassword;
}
