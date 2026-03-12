package com.trupti.vo;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountSummaryVO {
	private Long accountId;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
}
