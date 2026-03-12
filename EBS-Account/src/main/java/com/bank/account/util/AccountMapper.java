package com.bank.account.util;

import com.bank.account.dto.AccountResponseDTO;
import com.bank.account.entity.AccountEntity;

public class AccountMapper {

	public static AccountResponseDTO toDTO(AccountEntity accountEntity) {
		return AccountResponseDTO.builder()
				.accountId(accountEntity.getAccountId())
				.accountNumber(accountEntity.getAccountNumber())
				.accountType(accountEntity.getAccountType())
				.balance(accountEntity.getBalance())
				.build();
	}
}
