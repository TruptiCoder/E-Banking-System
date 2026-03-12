package com.trupti.vo;

import com.trupti.dto.CustomerDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseVO {
	private CustomerDTO customerDTO;
	private String message;
}
