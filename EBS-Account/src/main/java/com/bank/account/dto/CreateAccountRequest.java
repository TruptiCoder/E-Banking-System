package com.bank.account.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateAccountRequest {

    private Long customerId;
    private String accountType;
    private BigDecimal initialDeposit;
}