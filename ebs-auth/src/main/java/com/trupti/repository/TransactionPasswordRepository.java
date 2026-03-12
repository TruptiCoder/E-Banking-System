package com.trupti.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trupti.entity.TransactionPassword;

public interface TransactionPasswordRepository extends JpaRepository<TransactionPassword, Long> {
	Optional<TransactionPassword> findByCustomerId(Long customerId);
}
