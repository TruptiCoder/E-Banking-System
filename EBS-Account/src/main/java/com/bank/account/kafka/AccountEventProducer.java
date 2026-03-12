package com.bank.account.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountEventProducer {

	private final KafkaTemplate<String, Object> kafkaTemplate;
	
	public void publishBalanceChanged(BalanceChangedEvent event) {
		kafkaTemplate.send("banking.account.balance-changed", event);
	}
}
