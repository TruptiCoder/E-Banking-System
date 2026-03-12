package com.bank.fund.kafka;

import java.time.LocalDateTime;

import java.util.Map;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.bank.fund.entity.FundTransferEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FundTransferProducer {

	private final KafkaTemplate<String, Object> kafkaTemplate;
	
	 public void publishTransferEvent(FundTransferEntity transfer) {

	        Map<String, Object> event = Map.of(
	                "transferId", transfer.getTransferId(),
	                "sourceAccountId", transfer.getSourceAccountId(),
	                "destAccountId", transfer.getDestinationAccountId(),
	                "amount", transfer.getAmount(),
	                "timestamp", LocalDateTime.now().toString()
	        );

	        kafkaTemplate.send(
	                "banking.fund-transfer.completed",
	                event
	        );
	    }
}
