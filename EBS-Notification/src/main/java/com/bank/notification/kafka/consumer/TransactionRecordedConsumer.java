package com.bank.notification.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.bank.notification.kafka.event.TransactionRecordedEvent;
import com.bank.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TransactionRecordedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "banking.transaction.recorded")
    public void consume(TransactionRecordedEvent event) {

        notificationService.handleTransactionNotification(event);

    }
}
