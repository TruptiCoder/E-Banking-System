package com.bank.fund.dto;



import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceCheckRequest {

	private Long accountId;
	
}
