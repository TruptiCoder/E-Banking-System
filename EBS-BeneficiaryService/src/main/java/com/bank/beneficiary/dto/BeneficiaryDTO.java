package com.bank.beneficiary.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BeneficiaryDTO {

    private Long beneficiaryId;

    private Long customerId;

    private String beneficiaryName;

    private String accountNumber;

    private String accountType;

    private String ifscCode;

    private String email;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime activatedAt;
}
