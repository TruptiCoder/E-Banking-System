package com.bank.fd.kafka;

import java.time.LocalDateTime;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.bank.fd.entity.FixedDepositEntity;
import com.bank.fd.event.FdClosedEvent;
import com.bank.fd.event.FdCreatedEvent;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KafkaFdProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishFdCreated(FixedDepositEntity fd) {

        FdCreatedEvent event = new FdCreatedEvent();

        event.setFdId(fd.getFdId());
        event.setCustomerId(fd.getCustomerId());
        event.setAccountId(fd.getAccountId());
        event.setDepositAmount(fd.getDepositAmount());
        event.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("banking.fd.created", event);
    }
    
    public void publishFdClosed(FixedDepositEntity fd) {

        FdClosedEvent event = new FdClosedEvent();

        event.setFdId(fd.getFdId());
        event.setCustomerId(fd.getCustomerId());
        event.setAccountId(fd.getAccountId());
        event.setDepositAmount(fd.getDepositAmount());
        event.setStatus(fd.getStatus());
        event.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("banking.fd.closed", event);
    }
}
