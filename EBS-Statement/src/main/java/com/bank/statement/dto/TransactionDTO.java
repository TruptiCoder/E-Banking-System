package com.bank.statement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class TransactionDTO {
	  private Long transactionId;
	    
	   
	    private Long accountId;
	    private String transactionType;
	    private BigDecimal amount;
	    private String description;
	    private String referenceNumber;
	    private BigDecimal balanceAfter;
	    
	    @JsonFormat(pattern ="yyyy-MM-dd HH:mm:ss")
	    private LocalDateTime createdAt;
}
