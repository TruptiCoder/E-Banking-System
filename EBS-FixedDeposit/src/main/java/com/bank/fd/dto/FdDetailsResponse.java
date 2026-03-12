package com.bank.fd.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FdDetailsResponse {

	private Long fdId;

    private Long customerId;

    private Long accountId;

    private BigDecimal depositAmount;

    private BigDecimal interestRate;

    private String depositType;

    private LocalDate startDate;

    private LocalDate maturityDate;

    private String status;

    private BigDecimal accruedInterest;
}
