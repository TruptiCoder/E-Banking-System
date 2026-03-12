package com.bank.fund.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="fund_transfers")
public class FundTransferEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transferId;
	
	private Long sourceAccountId;
	
	private Long destinationAccountId;
	
	private Long beneficiaryId;
	
	private BigDecimal amount;
	
	private String status;
	
	private Boolean transactionPasswordVerified;
	
	private LocalDateTime createdAt;

	
	
}
