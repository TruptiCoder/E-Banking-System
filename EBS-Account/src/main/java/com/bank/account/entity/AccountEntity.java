package com.bank.account.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="accounts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountEntity {

	@Id
	private Long accountId;
	
	private Long customerId;
	
	private String accountNumber;
	
	private String accountType;
	
	private BigDecimal balance;
	
	private String status;
	
	private LocalDateTime createdAt;
	
}
