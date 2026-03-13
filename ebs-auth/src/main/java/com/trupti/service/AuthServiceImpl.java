package com.trupti.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trupti.client.CustomerServiceClient;
import com.trupti.dto.ChangePasswordDTO;
import com.trupti.dto.CustomerDTO;
import com.trupti.dto.CustomerResponseDTO;
import com.trupti.dto.LoginRequestDTO;
import com.trupti.dto.LoginResponseDTO;
import com.trupti.dto.RefreshTokenRequestDTO;
import com.trupti.entity.AuditLog;
import com.trupti.entity.PasswordHistory;
import com.trupti.repository.AuditLogRepository;
import com.trupti.repository.PasswordHistoryRepository;
import com.trupti.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordHistoryRepository passwordHistoryRepository;
	private final AuditLogRepository auditLogRepository;
	private final CustomerServiceClient customerServiceClient;
//	private final AuthEventProducer authEventProducer;

	@Override
	public Optional<LoginResponseDTO> login(LoginRequestDTO request, String ipAddress) {

		CustomerResponseDTO customerRes = customerServiceClient.getCustomerByUsername(request.getUsername());
		if (customerRes.getCustomerDTO() == null)
			return Optional.empty();

		CustomerDTO customer = customerRes.getCustomerDTO();
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

	@Override
	public Optional<LoginResponseDTO> refreshToken(RefreshTokenRequestDTO request) {

		if (!jwtTokenProvider.validateToken(request.getRefreshToken())) {
			return Optional.empty();
		}

		Long customerId = jwtTokenProvider.getCustomerId(request.getRefreshToken());

		CustomerResponseDTO customer = customerServiceClient.getCustomer(customerId);
		if (customer.getCustomerDTO() == null)
			return Optional.empty();

		String newAccessToken = jwtTokenProvider.generateAccessToken(customer.getCustomerDTO());

		return Optional.of(LoginResponseDTO.builder().accessToken(newAccessToken)
				.refreshToken(request.getRefreshToken()).expiresIn(3600).build());
	}

	@Override
	public boolean changePassword(ChangePasswordDTO request) {

		CustomerResponseDTO customerRes = customerServiceClient.getCustomer(request.getCustomerId());
		if (customerRes.getCustomerDTO() == null)
			return false;

		CustomerDTO customer = customerRes.getCustomerDTO();
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
		String passwordHash = passwordEncoder.encode(request.getNewPassword());
		return customerServiceClient.changePassword(customer.getCustomerId(), passwordHash);
	}

	@Override
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
