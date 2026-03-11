package com.trupti.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

	private Long customerId;
	private String username;
	private String passwordHash;
	private String email;
	private String phone;
	private String address;
	private String status;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}