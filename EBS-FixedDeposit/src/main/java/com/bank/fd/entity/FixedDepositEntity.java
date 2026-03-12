package com.bank.fd.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="fixed_deposits")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixedDepositEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fdId;
	private Long customerId;
	private Long accountId;
	private BigDecimal depositAmount;
	private BigDecimal interestRate;
	private String depositType;
	private LocalDate startDate;
	private LocalDate maturityDate;
	private String status;
	private LocalDateTime createdAt;
	
	
}
