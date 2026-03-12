package com.bank.account.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountResponseDTO {

	private Long accountId;
	private String accountNumber;
	private String accountType;
	private BigDecimal balance;
	
}
