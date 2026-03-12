package com.trupti.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.trupti.dto.CredentialNotificationRequest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@FeignClient(name = "EBS-NOTIFICATION", path = "/api/notifications")
public interface NotificationServiceClient {
	
	@GetMapping("/send-credentials")
	boolean sendEmail(@RequestBody CredentialNotificationRequest request);
}
