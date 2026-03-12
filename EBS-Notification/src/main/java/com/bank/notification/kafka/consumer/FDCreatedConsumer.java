package com.bank.notification.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.bank.notification.kafka.event.FDCreatedEvent;
import com.bank.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FDCreatedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "banking.fd.created")
    public void consume(FDCreatedEvent event) {

        notificationService.handleFDNotification(event);

    }
}
