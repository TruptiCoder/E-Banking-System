package com.bank.beneficiary.entity;



import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "beneficiaries")
@Data
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long beneficiaryId;

    @Column(name = "customer_id")
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