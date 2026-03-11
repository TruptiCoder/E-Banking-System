package com.trupti.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trupti.dto.ChangePasswordDTO;
import com.trupti.dto.LoginRequestDTO;
import com.trupti.dto.LoginResponseDTO;
import com.trupti.dto.RefreshTokenRequestDTO;
import com.trupti.entity.AuditLog;
import com.trupti.entity.Customer;
import com.trupti.entity.PasswordHistory;
import com.trupti.repository.AuditLogRepository;
import com.trupti.repository.CustomerRepository;
import com.trupti.repository.PasswordHistoryRepository;
import com.trupti.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final PasswordEncoder passwordEncoder;
	private final CustomerRepository customerRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordHistoryRepository passwordHistoryRepository;
	private final AuditLogRepository auditLogRepository;
//	private final CustomerServiceClient serviceClient;
//	private final AuthEventProducer authEventProducer;

	public Optional<LoginResponseDTO> login(LoginRequestDTO request, String ipAddress) {

		Optional<Customer> customerRes = customerRepository.findByUsername(request.getUsername());
		if(customerRes.isEmpty()) return Optional.empty();
		
		Customer customer = customerRes.get();
		if (!passwordEncoder.matches(request.getPassword(), customer.getPasswordHash())) {
			recordAudit(customer.getCustomerId(), "LOGIN_FAILED", ipAddress);
			return Optional.empty();
		}

		String accessToken = jwtTokenProvider.generateAccessToken(customer);
		String refreshToken = jwtTokenProvider.generateRefreshToken(customer);

		recordAudit(customer.getCustomerId(), "LOGIN_SUCCESS", ipAddress);

//		authEventProducer.publishLoginEvent(customer.getCustomerId(), customer.getUsername(), ipAddress, true);

		return Optional.of(
				LoginResponseDTO.builder().accessToken(accessToken).refreshToken(refreshToken).expiresIn(3600).build());
	}

	public Optional<LoginResponseDTO> refreshToken(RefreshTokenRequestDTO request) {

		if (!jwtTokenProvider.validateToken(request.getRefreshToken())) {
			return Optional.empty();
		}

		Long customerId = jwtTokenProvider.getCustomerId(request.getRefreshToken());

		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		String newAccessToken = jwtTokenProvider.generateAccessToken(customer);

		return Optional.of(LoginResponseDTO.builder().accessToken(newAccessToken).refreshToken(request.getRefreshToken())
				.expiresIn(3600).build());
	}

	public boolean changePassword(ChangePasswordDTO request) {

		Optional<Customer> customerRes = customerRepository.findById(request.getCustomerId());
		if(customerRes.isEmpty()) return false;
		
		Customer customer = customerRes.get();
		if (!passwordEncoder.matches(request.getOldPassword(), customer.getPasswordHash())) {
			return false;
		}

		if (passwordEncoder.matches(request.getNewPassword(), customer.getPasswordHash())) {
			return false;
		}

		// Save password history
		PasswordHistory history = new PasswordHistory();
		history.setCustomerId(customer.getCustomerId());
		history.setPasswordHash(customer.getPasswordHash());
		history.setChangedAt(LocalDateTime.now());

		passwordHistoryRepository.save(history);

		// Update password
		customer.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
		customerRepository.save(customer);
		
		return true;
	}

	public boolean validateToken(String token) {
		return jwtTokenProvider.validateToken(token);
	}

	private void recordAudit(Long customerId, String action, String ipAddress) {

		AuditLog log = new AuditLog();

		log.setCustomerId(customerId);
		log.setAction(action);
		log.setServiceName("AUTH-SERVICE");
		log.setIpAddress(ipAddress);
		log.setCreatedAt(LocalDateTime.now());

		auditLogRepository.save(log);
	}

}
