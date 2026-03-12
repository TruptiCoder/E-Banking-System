package com.trupti.vo;

import com.trupti.dto.CustomerDTO;
import com.trupti.dto.CustomerProfileDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerWithProfileVO {
	private CustomerDTO customerDTO;
	private CustomerProfileDTO customerProfileDTO;
	private String message;
}
