package com.bank.fd.event;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class FdCreatedEvent {

    private Long fdId;

    private Long customerId;

    private Long accountId;

    private BigDecimal depositAmount;

    private LocalDateTime timestamp;
}
