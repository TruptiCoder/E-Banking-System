package com.bank.fd.service;

import java.util.List;

import com.bank.fd.dto.CreateFdRequest;
import com.bank.fd.dto.FdDetailsResponse;
import com.bank.fd.dto.FixedDepositResponse;

public interface FixedDepositService {

	FixedDepositResponse createdFd(CreateFdRequest request);
	List<FixedDepositResponse> getCustomerFds(Long customerId);
	FdDetailsResponse getFdDetails(Long fdId);
	void closeFd(Long fdId);
}
