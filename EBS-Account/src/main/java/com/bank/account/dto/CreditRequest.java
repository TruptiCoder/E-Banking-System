package com.bank.account.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CreditRequest {

	private BigDecimal amount;
	
}
