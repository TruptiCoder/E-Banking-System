package com.bank.fd.dto;

import java.math.BigDecimal;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFdRequest {

	private Long customerId;
	private Long accountId;
	private BigDecimal depositAmount;
	private BigDecimal interestRate;
	private String depositType;
	private Integer tenureMonths;
	
}
