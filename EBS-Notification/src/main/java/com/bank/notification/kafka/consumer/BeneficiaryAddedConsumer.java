package com.bank.notification.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.bank.notification.kafka.event.BeneficiaryAddedEvent;
import com.bank.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BeneficiaryAddedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "banking.beneficiary.added")
    public void consume(BeneficiaryAddedEvent event) {

        notificationService.handleBeneficiaryNotification(event);

    }
}