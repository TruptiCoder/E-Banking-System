package com.trupti.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "customers")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
