package com.bank.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.account.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

	List<AccountEntity> findByCustomerId(Long customerId);
	AccountEntity findByAccountNumber(String accountNumber);
}
