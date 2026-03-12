package com.bank.beneficiary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.beneficiary.entity.Beneficiary;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	List<Beneficiary> findByCustomerId(Long customerId);
	List<Beneficiary> findByStatus(String status);
}
