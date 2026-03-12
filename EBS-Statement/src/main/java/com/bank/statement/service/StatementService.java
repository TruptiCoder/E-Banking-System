package com.bank.statement.service;

import com.bank.statement.dto.StatementRequestDTO;
import com.bank.statement.dto.StatementResponseDTO;
import java.io.IOException;

public interface StatementService {
	StatementResponseDTO generateStatement(StatementRequestDTO request);

	StatementResponseDTO getStatement(Long statementId);

	byte[] downloadStatement(Long accountId) throws IOException ;
}
