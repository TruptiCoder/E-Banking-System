package com.bank.account.dto;

import java.math.BigDecimal;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceCheckResponse {

    private BigDecimal currentBalance;
}
