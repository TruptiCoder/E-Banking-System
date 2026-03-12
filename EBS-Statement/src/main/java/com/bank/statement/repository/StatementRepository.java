package com.bank.statement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.statement.entity.Statement;

public interface StatementRepository extends JpaRepository<Statement, Long>{

	
	List<Statement> findByAccountId(Long accountId);

}
