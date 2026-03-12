package com.bank.notification.kafka.consumer;

import com.bank.notification.kafka.event.FundTransferCompletedEvent;
import com.bank.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FundTransferCompletedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(
            topics = "banking.fund-transfer.completed",
            groupId = "EBS-Notification",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(FundTransferCompletedEvent event) {

        notificationService.handleFundTransferNotification(event);

    }
}