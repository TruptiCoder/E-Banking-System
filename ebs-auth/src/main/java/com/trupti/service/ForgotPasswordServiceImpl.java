package com.trupti.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trupti.client.CustomerServiceClient;
import com.trupti.client.NotificationServiceClient;
import com.trupti.dto.CustomerDTO;
import com.trupti.dto.CustomerResponseDTO;
import com.trupti.entity.PasswordResetOtp;
import com.trupti.repository.PasswordRestOtpRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

	private final CustomerServiceClient customerClient;
	private final PasswordRestOtpRepository otpRepository;
	private final PasswordEncoder passwordEncoder;
	private final NotificationServiceClient notificationServiceClient;

	@Override
	public boolean generateOtp(String username) {

		CustomerResponseDTO customer = customerClient.getCustomerByUsername(username);
		if (customer.getCustomerDTO() == null)
			return false;

		String otp = String.valueOf(new Random().nextInt(900000) + 100000);

		PasswordResetOtp resetOtp = new PasswordResetOtp();
		resetOtp.setUsername(username);
		resetOtp.setOtpCode(otp);
		resetOtp.setCreatedAt(LocalDateTime.now());
		resetOtp.setExpiresAt(LocalDateTime.now().plusMinutes(5));

		otpRepository.save(resetOtp);

		return notificationServiceClient.sendOtp(customer.getCustomerDTO().getCustomerId(), otp);
	}

	@Override
	public String resetPassword(String username, String otp, String newPassword) {

		Optional<PasswordResetOtp> savedOtpRes = otpRepository.findTopByUsernameOrderByCreatedAtDesc(username);
		if (savedOtpRes.isEmpty())
			return "Customer not found!";

		PasswordResetOtp savedOtp = savedOtpRes.get();

		if (!savedOtp.getOtpCode().equals(otp)) {
			return "OTP is wrong, Try again!";
		}

		if (savedOtp.getExpiresAt().isBefore(LocalDateTime.now())) {
			return "OTP is expired!";
		}

		CustomerResponseDTO customerRes = customerClient.getCustomerByUsername(username);
		if (customerRes.getCustomerDTO() == null)
			return "Customer not found!";
		CustomerDTO customer = customerRes.getCustomerDTO();
		String passwordHash = passwordEncoder.encode(newPassword);

		customerClient.changePassword(customer.getCustomerId(), passwordHash);

		savedOtp.setUsed(true);
		otpRepository.save(savedOtp);

		return "Password changed successfully!";
	}
}
