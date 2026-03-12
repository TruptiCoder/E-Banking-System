package com.trupti.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trupti.entity.PasswordHistory;

public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long> {
	List<PasswordHistory> findByCustomerIdOrderByChangedAtDesc(Long customerId);

}
