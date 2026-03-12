package com.bank.notification.kafka.event;

import lombok.Data;

@Data
public class BeneficiaryAddedEvent {

    private Long beneficiaryId;
    private Long customerId;
    private String beneficiaryName;
    private Long accountNumber;
    private String timestamp;

}
