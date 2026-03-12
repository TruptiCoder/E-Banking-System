package com.trupti.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(name = "customer_profiles")
public class CustomerProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long profileId;
	@Column(unique = true)
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
