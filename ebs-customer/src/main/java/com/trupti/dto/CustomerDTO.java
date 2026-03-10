package com.trupti.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

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
