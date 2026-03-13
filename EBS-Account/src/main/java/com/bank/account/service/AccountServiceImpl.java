package com.bank.account.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.account.client.TransactionServiceClient;
import com.bank.account.dto.AccountResponseDTO;
import com.bank.account.dto.BalanceCheckRequest;
import com.bank.account.dto.BalanceCheckResponse;
import com.bank.account.dto.CardAuthResponse;
import com.bank.account.dto.CreateAccountRequest;
import com.bank.account.dto.CreditRequest;
import com.bank.account.dto.DebitRequest;
import com.bank.account.dto.TransactionRecordRequest;
import com.bank.account.entity.AccountEntity;
import com.bank.account.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

	private final AccountRepository accountRepository;
	private final TransactionServiceClient client;
	
	@Override
	public AccountResponseDTO createAccount(CreateAccountRequest request) {

	    AccountEntity account = AccountEntity.builder()
	            .accountId(System.currentTimeMillis())
	            .customerId(request.getCustomerId())
	            .accountNumber("ACC" + System.currentTimeMillis())
	            .accountType(request.getAccountType())
	            .balance(request.getInitialDeposit())
	            .status("ACTIVE")
	            .build();

	    accountRepository.save(account);

	    return mapToDTO(account);
	}
	
	@Override
	public AccountResponseDTO getAccount(Long accountId) {

	    AccountEntity account = accountRepository.findById(accountId)
	            .orElseThrow(() -> new RuntimeException("Account not found"));

	    return mapToDTO(account);
	}

	@Override
	public void deleteAccount(Long accountId) {

	    if(!accountRepository.existsById(accountId)) {
	        throw new RuntimeException("Account not found");
	    }

	    accountRepository.deleteById(accountId);
	}
	
	private AccountResponseDTO mapToDTO(AccountEntity accountEntity) {
		// TODO Auto-generated method stub
		
		return AccountResponseDTO.builder()
				.accountId(accountEntity.getAccountId())
				.accountNumber(accountEntity.getAccountNumber())
				.accountType(accountEntity.getAccountType())
				.balance(accountEntity.getBalance())
				.build();
	}

	@Override
	public AccountResponseDTO getAccountDetail(Long accountId) {
	
		AccountEntity accountEntity = accountRepository.findById(accountId)
				.orElseThrow(()-> new RuntimeException("Account not found"));
		return mapToDTO(accountEntity);
	}

	@Override
	public List<AccountResponseDTO> getCustomerAccounts(Long customerId) {
	
		List<AccountEntity> accounts = accountRepository.findByCustomerId(customerId);
		
		return accounts.stream()
				.map(this::mapToDTO)
				.toList();
	}

	@Override
	public BalanceCheckResponse checkBalance(BalanceCheckRequest request) {

	    AccountEntity accountEntity = accountRepository.findById(request.getAccountId())
	            .orElseThrow(() -> new RuntimeException("Account not found"));
	    
	    return BalanceCheckResponse.builder()
	            .currentBalance(accountEntity.getBalance())
	            .build();
	}

	@Override
	public void debitAccount(Long accountId, DebitRequest request) {
		// TODO Auto-generated method stub
		AccountEntity accountEntity = accountRepository.findById(accountId)
				.orElseThrow(()->new RuntimeException("Account not found"));
		
		if(accountEntity.getBalance().compareTo(request.getAmount()) < 0) {
			throw new RuntimeException("Insufficient Balance");
		}
		
		accountEntity.setBalance(accountEntity.getBalance().subtract(request.getAmount()));
		
		accountRepository.save(accountEntity);
		TransactionRecordRequest req = new TransactionRecordRequest();
		req.setAccountId(accountId);
		req.setAmount(request.getAmount());
		req.setBalanceAfter(accountEntity.getBalance());
		req.setDescription("Debited " + request.getAmount());
		req.setTransactionType("Debit");
		client.recordTransaction(req);
	}

	@Override
	public void creditAccount(Long accountId, CreditRequest request) {
		// TODO Auto-generated method stub
		AccountEntity accountEntity = accountRepository.findById(accountId)
				.orElseThrow(()->new RuntimeException("Account not found"));
		
		accountEntity.setBalance(accountEntity.getBalance().add(request.getAmount()));
		
		accountRepository.save(accountEntity);
		TransactionRecordRequest req = new TransactionRecordRequest();
		req.setAccountId(accountId);
		req.setAmount(request.getAmount());
		req.setBalanceAfter(accountEntity.getBalance());
		req.setDescription("Credited " + request.getAmount());
		req.setTransactionType("Credit");
		client.recordTransaction(req);
	}

	@Override
	public AccountResponseDTO getByNumber(String accountNumber) {
		AccountEntity entity = accountRepository.findByAccountNumber(accountNumber);
		if(entity != null) return mapToDTO(entity);
		return null;
	}

	@Override
	public CardAuthResponse authenticateCard(String accountNumber) {
		AccountEntity entity = accountRepository.findByAccountNumber(accountNumber);
		if(entity == null) return null;
		CardAuthResponse res = new CardAuthResponse();
		res.setAccountId(entity.getAccountId());
		res.setAccountType(entity.getAccountType());
		res.setCustomerId(entity.getCustomerId());
		return res;
	}

}
