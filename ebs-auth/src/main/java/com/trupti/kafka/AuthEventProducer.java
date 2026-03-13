package com.trupti.kafka;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class AuthEventProducer {
	private final KafkaTemplate<String, Object> kafkaTemplate;

	private static final String LOGIN_TOPIC = "banking.auth.login";

	public AuthEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	public void publishLoginEvent(Long customerId, String username, String ipAddress, boolean success) {

		Map<String, Object> event = new HashMap<>();

		event.put("customerId", customerId);
		event.put("username", username);
		event.put("ipAddress", ipAddress);
		event.put("success", success);
		event.put("timestamp", LocalDateTime.now().toString());

		kafkaTemplate.send(LOGIN_TOPIC, customerId.toString(), event);
	}
}
