package com.bank.account.kafka;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BalanceChangedEvent {

	private UUID accountId;
	private BigDecimal previousBalance;
	private BigDecimal newBalance;
	private LocalDateTime timestamp;
	
}
