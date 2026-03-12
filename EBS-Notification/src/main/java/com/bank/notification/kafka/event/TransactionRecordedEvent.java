package com.bank.notification.kafka.event;

import lombok.Data;

@Data
public class TransactionRecordedEvent {

    private Long transactionId;
    private Long accountId;
    private String transactionType;
    private Double amount;
    private Double balanceAfter;
    private String timestamp;

}
