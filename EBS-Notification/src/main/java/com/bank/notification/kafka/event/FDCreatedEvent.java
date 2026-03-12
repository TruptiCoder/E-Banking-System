package com.bank.notification.kafka.event;

import lombok.Data;

@Data
public class FDCreatedEvent {

    private Long fdId;
    private Long accountId;
    private Double depositAmount;
    private Integer tenureMonths;
    private String timestamp;

}