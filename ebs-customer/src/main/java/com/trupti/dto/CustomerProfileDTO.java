package com.trupti.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerProfileDTO {
	private Long profileId;
	private Long customerId;
	private String firstName;
	private String lastName;
	private LocalDate dateOfBirth;
	private String address;
	private String city;
	private String country;
	private String postalCode;
	private LocalDateTime updatedAt;
}
