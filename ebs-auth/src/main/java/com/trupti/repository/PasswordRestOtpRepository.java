package com.trupti.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trupti.entity.PasswordResetOtp;

@Repository
public interface PasswordRestOtpRepository extends JpaRepository<PasswordResetOtp, Long> {
	Optional<PasswordResetOtp> findTopByUsernameOrderByCreatedAtDesc(String username);
}
