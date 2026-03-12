package com.bank.notification.controller;



import com.bank.notification.dto.CredentialNotificationRequest;
import com.bank.notification.entity.NotificationEntity;
import com.bank.notification.repository.NotificationRepository;
import com.bank.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

	private final NotificationRepository notificationRepository;
	private final NotificationService notificationService;

	@GetMapping("/{customerId}")
	public boolean getNotifications(@PathVariable Long customerId) {

		List<NotificationEntity> list = notificationRepository.findByCustomerId(customerId);
		if(list.size() > 0) return true;
		return false;

	}
	
	@PostMapping("/send-credentials")
    public boolean sendCredentials(@RequestBody CredentialNotificationRequest request) {

        notificationService.sendCredentialsEmail(
        		request.getCustomerId(),
                request.getUsername(),
                request.getTemporaryPassword()
        );

        return true;
    }

	@PostMapping("/send-otp/{customerId}/{otp}")
	public Boolean sendOtp(@PathVariable Long customerId, @PathVariable String otp) {

		notificationService.sendOtpToCustomer(customerId, otp);

		return true;
	}
}
