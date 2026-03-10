package com.trupti.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.trupti.client.AccountServiceClient;
import com.trupti.dto.CustomerDTO;
import com.trupti.dto.CustomerProfileDTO;
import com.trupti.dto.UpdateProfileRequestDTO;
import com.trupti.entity.Customer;
import com.trupti.entity.CustomerProfile;
import com.trupti.repository.CustomerProfileRepository;
import com.trupti.repository.CustomerRepository;
import com.trupti.vo.AccountSummaryVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl {
	
	private final CustomerRepository customerRepository;
	private final CustomerProfileRepository customerProfileRepository;
	private final AccountServiceClient accountServiceClient;
	private final ModelMapper mapper;
	
	public Optional<CustomerDTO> getCustomer(Long customerId) {
		Optional<Customer> customer = customerRepository.findById(customerId);
		if(customer.isEmpty()) return Optional.empty();
	
		CustomerDTO customerDTO = mapper.map(customer, CustomerDTO.class);
		return Optional.of(customerDTO);
	}
	
	public Optional<CustomerProfileDTO> updateProfile(Long customerId, UpdateProfileRequestDTO request) {
		Optional<CustomerProfile> profileOp = customerProfileRepository.findByCustomerId(customerId);
		if(profileOp.isEmpty()) return Optional.empty();
		CustomerProfile profile = profileOp.get();
		profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setCountry(request.getCountry());
        profile.setPostalCode(request.getPostalCode());
        profile.setUpdatedAt(LocalDateTime.now());
        
        customerProfileRepository.save(profile);
        
        CustomerProfileDTO profileDto = mapper.map(profile, CustomerProfileDTO.class);
        return Optional.of(profileDto);
	}
	
	public Optional<List<AccountSummaryVO>> getCustomerAccounts(Long customerId) {
		return accountServiceClient.getAccounts(customerId);
	}
	
}
