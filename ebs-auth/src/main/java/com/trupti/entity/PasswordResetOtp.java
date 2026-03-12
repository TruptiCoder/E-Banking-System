package com.trupti.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetOtp {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long otpId;
	private String username;
	private String otpCode;
	private boolean used = false;
	private LocalDateTime expiresAt;
	private LocalDateTime createdAt;
}
