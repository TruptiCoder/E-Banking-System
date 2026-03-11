package com.trupti.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.CreateCustomerRequest;
import com.trupti.dto.CustomerDTO;
import com.trupti.service.CustomerServiceImpl;
import com.trupti.vo.CustomerResponseVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customers/admin")
@RequiredArgsConstructor
public class AdminCustomerController {
	
	private final CustomerServiceImpl service;
	
	@PostMapping("/register")
	public ResponseEntity<CustomerResponseVO> createCustomer(@RequestBody CreateCustomerRequest request) {
		Optional<CustomerDTO> dto = service.createCustomer(request);
		if(dto.isEmpty()) return ResponseEntity.ok().body(new CustomerResponseVO(null, "Customer with username already exists!"));
		return ResponseEntity.ok().body(new CustomerResponseVO(dto.get(), "Customer created successfully!"));
	}

	@PutMapping("/{customerId}")
	public ResponseEntity<CustomerResponseVO> updateCustomer(@PathVariable Long customerId, @RequestBody CreateCustomerRequest request) {
		Optional<CustomerDTO> dto = service.updateCustomer(customerId, request);
		if(dto.isEmpty()) return ResponseEntity.ok().body(new CustomerResponseVO(null, "Customer does not exists!")); 
		return ResponseEntity.ok().body(new CustomerResponseVO(dto.get(), "Customer updated successfully!"));
	}

	@DeleteMapping("/{customerId}")
	public boolean deleteCustomer(@PathVariable Long customerId) {
		return service.deleteCustomer(customerId);
	}
}
