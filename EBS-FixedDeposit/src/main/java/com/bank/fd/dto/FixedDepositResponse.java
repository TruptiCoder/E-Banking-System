package com.bank.fd.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixedDepositResponse {

	private Long fdId;
	private Long customerId;
	private BigDecimal depositAmount;
	private BigDecimal interestRate;
	private LocalDate maturityDate;
	private String status;
	
}
