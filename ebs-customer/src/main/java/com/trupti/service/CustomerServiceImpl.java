package com.trupti.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trupti.client.AccountServiceClient;
import com.trupti.dto.CreateCustomerRequest;
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
	private final PasswordEncoder passwordEncoder;
	
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
		List<AccountSummaryVO> list = accountServiceClient.getAccounts(customerId);
		if(list.size() > 0) {
			return Optional.of(list);
		}
		return Optional.empty();
	}

	public Optional<CustomerDTO> createCustomer(CreateCustomerRequest request) {
		Customer entity = new Customer();
		entity.setUsername(request.getUsername());
		String passwordHash = passwordEncoder.encode("password");
		entity.setPasswordHash(passwordHash);
		entity.setAddress(request.getAddress());
		entity.setEmail(request.getEmail());
		entity.setPhone(request.getPhone());
		entity.setCreatedAt(LocalDateTime.now());
		entity.setUpdatedAt(LocalDateTime.now());
		entity.setStatus("New");
		
		Optional<Customer> customerRes = customerRepository.findByUsername(request.getUsername());
		if(customerRes.isPresent()) return Optional.empty();
		
		Customer customer = customerRepository.save(entity);
		
		CustomerProfile profile = new CustomerProfile();
		profile.setAddress(request.getAddress());
		profile.setCustomerId(customer.getCustomerId());
		profile.setCity(request.getCity());
		profile.setCountry(request.getCountry());
		profile.setDateOfBirth(request.getDateOfBirth());
		profile.setFirstName(request.getFirstName());
		profile.setLastName(request.getLastName());
		profile.setPostalCode(request.getPostalCode());
		profile.setUpdatedAt(LocalDateTime.now());
		
		customerProfileRepository.save(profile);
		
		return Optional.of(mapper.map(customer, CustomerDTO.class));
	}

	public boolean deleteCustomer(Long customerId) {
		customerRepository.deleteById(customerId);
		Optional<CustomerProfile> profile = customerProfileRepository.findByCustomerId(customerId);
		if(profile.isEmpty()) return true;
		customerProfileRepository.deleteById(profile.get().getProfileId());
		return true;
	}

	public Optional<CustomerDTO> updateCustomer(Long customerId, CreateCustomerRequest request) {
		Optional<Customer> customerRes = customerRepository.findById(customerId);
		if(customerRes.isEmpty()) return Optional.empty();
		
		Customer customer = customerRes.get();
		
		customer.setUsername(request.getUsername());
		customer.setAddress(request.getAddress());
		customer.setEmail(request.getEmail());
		customer.setPhone(request.getPhone());
		
		CustomerProfile profile = customerProfileRepository.findByCustomerId(customerId).get();
		profile.setAddress(request.getAddress());
		profile.setCity(request.getCity());
		profile.setCountry(request.getCountry());
		profile.setDateOfBirth(request.getDateOfBirth());
		profile.setFirstName(request.getFirstName());
		profile.setLastName(request.getLastName());
		profile.setPostalCode(request.getPostalCode());
		customerProfileRepository.save(profile);
		
		Customer res = customerRepository.save(customer);
		return Optional.of(mapper.map(res, CustomerDTO.class));
	}

	public Optional<CustomerDTO> getCustomerByUsername(String username) {
		Optional<Customer> customer = customerRepository.findByUsername(username);
		if(customer.isEmpty()) return Optional.empty();
		return Optional.of(mapper.map(customer.get(), CustomerDTO.class));
	}

	public boolean changePassword(Long customerId, String passwordHash) {
		Optional<Customer> customer = customerRepository.findById(customerId);
		if(customer.isEmpty()) return false;
		Customer customerEntity = customer.get();
		customerEntity.setPasswordHash(passwordHash);
		customerEntity.setStatus("Active");
		customerRepository.save(customerEntity);
		return true;
	}

	public Optional<CustomerProfileDTO> getProfile(Long customerId) {
		Optional<CustomerProfile> profileEntity = customerProfileRepository.findByCustomerId(customerId);
		if(profileEntity.isEmpty()) return Optional.empty();
		return Optional.of(mapper.map(profileEntity, CustomerProfileDTO.class));
	}
}
