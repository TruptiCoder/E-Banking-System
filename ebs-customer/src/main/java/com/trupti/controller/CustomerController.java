package com.trupti.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.CustomerDTO;
import com.trupti.dto.CustomerProfileDTO;
import com.trupti.dto.UpdateProfileRequestDTO;
import com.trupti.service.CustomerServiceImpl;
import com.trupti.vo.AccountSummaryVO;
import com.trupti.vo.CustomerResponseVO;
import com.trupti.vo.UpdateProfileResponseVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

	private final CustomerServiceImpl service;

	@GetMapping("/{customerId}")
	public ResponseEntity<CustomerResponseVO> getCustomer(@PathVariable Long customerId) {
		Optional<CustomerDTO> dto = service.getCustomer(customerId);
		if (dto.isPresent()) {
			CustomerResponseVO vo = new CustomerResponseVO(dto.get(), "Customer fetched successfully!");
			return ResponseEntity.ok().body(vo);
		}
		return ResponseEntity.ok().body(new CustomerResponseVO(null, "Customer not found!"));
	}

	@PutMapping("/{customerId}/profile")
	public ResponseEntity<UpdateProfileResponseVO> updateProfile(@PathVariable Long customerId,
			@RequestBody UpdateProfileRequestDTO request) {
		Optional<CustomerProfileDTO> profileRes = service.updateProfile(customerId, request);
		if (profileRes.isPresent()) {
			UpdateProfileResponseVO vo = new UpdateProfileResponseVO(profileRes.get(), "Profile Updated successfully!");
			return ResponseEntity.ok().body(vo);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new UpdateProfileResponseVO(null, "Profile not updated!"));
	}

	@GetMapping("/{customerId}/accounts")
	public ResponseEntity<List<AccountSummaryVO>> getAccounts(@PathVariable Long customerId) {
		Optional<List<AccountSummaryVO>> accountsRes = service.getCustomerAccounts(customerId);
		if (accountsRes.isPresent()) {
			return ResponseEntity.ok().body(accountsRes.get());
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/getbyUsername/{username}")
	public ResponseEntity<CustomerResponseVO> getCustomerByUsername(@PathVariable String username) {
		Optional<CustomerDTO> dto = service.getCustomerByUsername(username);
		if(dto.isEmpty()) return ResponseEntity.ok().body(new CustomerResponseVO(null, "User not found!"));
		return ResponseEntity.ok().body(new CustomerResponseVO(dto.get(), "User fetched Successfully!"));
	}
	
	@PutMapping("/{customerId}/{passwordHash}")
	public ResponseEntity<Boolean> changePassword(@PathVariable Long customerId, @PathVariable String passwordHash) {
		boolean res = service.changePassword(customerId, passwordHash);
		return ResponseEntity.ok().body(res);
	}

}
