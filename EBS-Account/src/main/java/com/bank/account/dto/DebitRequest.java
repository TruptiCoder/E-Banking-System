package com.bank.account.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DebitRequest {

	private BigDecimal amount;
	
}
