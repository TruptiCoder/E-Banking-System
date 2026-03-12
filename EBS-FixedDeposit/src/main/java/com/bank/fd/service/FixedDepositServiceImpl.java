package com.bank.fd.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bank.fd.client.AccountServiceClient;
import com.bank.fd.dto.CreateFdRequest;
import com.bank.fd.dto.FdDetailsResponse;
import com.bank.fd.dto.FixedDepositResponse;
import com.bank.fd.entity.FixedDepositEntity;
import com.bank.fd.event.FdClosedEvent;
import com.bank.fd.kafka.KafkaFdProducer;
import com.bank.fd.repository.FixedDepositRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FixedDepositServiceImpl implements FixedDepositService {

	private final FixedDepositRepository repository;
	private final AccountServiceClient client;
	private final KafkaFdProducer producer;
	private final ModelMapper modelMapper;
	
	@Override
	public FixedDepositResponse createdFd(CreateFdRequest request) {
		// TODO Auto-generated method stub
		  client.debitAccount(request.getAccountId(), request.getDepositAmount());

		  FixedDepositEntity fd = modelMapper.map(request, FixedDepositEntity.class);

		    fd.setStartDate(LocalDate.now());
		    fd.setMaturityDate(LocalDate.now().plusMonths(request.getTenureMonths()));
		    fd.setStatus("ACTIVE");
		    fd.setCreatedAt(LocalDateTime.now());

		    FixedDepositEntity savedFd = repository.save(fd);

		    producer.publishFdCreated(savedFd);

		    return modelMapper.map(savedFd, FixedDepositResponse.class);
	}

	@Override
	public List<FixedDepositResponse> getCustomerFds(Long customerId) {

	    List<FixedDepositEntity> fds = repository.findByCustomerId(customerId);

	    return fds.stream()
	            .map(fd -> modelMapper.map(fd, FixedDepositResponse.class))
	            .toList();
	}

	@Override
	public FdDetailsResponse getFdDetails(Long fdId) {

	    FixedDepositEntity fd = repository.findById(fdId)
	            .orElseThrow(() -> new RuntimeException("FD not found"));

	    FdDetailsResponse response =
	            modelMapper.map(fd, FdDetailsResponse.class);

	    long days = ChronoUnit.DAYS.between(
	            fd.getStartDate(),
	            LocalDate.now()
	    );

	    BigDecimal interest =
	            fd.getDepositAmount()
	                    .multiply(fd.getInterestRate())
	                    .multiply(BigDecimal.valueOf(days))
	                    .divide(BigDecimal.valueOf(36500), 2, RoundingMode.HALF_UP);

	    response.setAccruedInterest(interest);

	    return response;
	}

	@Override
	@Transactional
	public void closeFd(Long fdId) {

	    FixedDepositEntity fd = repository.findById(fdId)
	            .orElseThrow(() -> new RuntimeException("FD not found"));

	    if (!fd.getStatus().equals("ACTIVE")) {
	        throw new RuntimeException("FD already closed");
	    }

	    fd.setStatus("PREMATURE_CLOSED");

	    repository.save(fd);

	    producer.publishFdClosed(fd);
	}
	
	

}
