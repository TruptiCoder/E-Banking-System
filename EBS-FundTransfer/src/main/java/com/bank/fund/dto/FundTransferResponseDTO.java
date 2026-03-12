package com.bank.fund.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FundTransferResponseDTO {
	private Long transferId;
	private String status;
	private BigDecimal amount;
	private LocalDateTime createdAt;
}
