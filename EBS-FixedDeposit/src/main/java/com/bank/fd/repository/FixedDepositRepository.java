package com.bank.fd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.fd.entity.FixedDepositEntity;

public interface FixedDepositRepository extends JpaRepository<FixedDepositEntity, Long> {

	List<FixedDepositEntity> findByCustomerId(Long customerId);
}
