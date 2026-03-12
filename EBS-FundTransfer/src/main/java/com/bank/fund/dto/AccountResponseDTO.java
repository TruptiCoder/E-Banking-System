package com.bank.fund.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountResponseDTO {

    private Long accountId;
    private Long customerId;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String status;
}
