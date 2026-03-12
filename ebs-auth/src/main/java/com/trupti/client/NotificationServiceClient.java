package com.trupti.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "EBS-NOTIFICATION", path = "/api/notifications")
public interface NotificationServiceClient {

	@PostMapping("/send-otp/{customerId}/{otp}")
	boolean sendOtp(@PathVariable Long customerId, @PathVariable String otp);
}
