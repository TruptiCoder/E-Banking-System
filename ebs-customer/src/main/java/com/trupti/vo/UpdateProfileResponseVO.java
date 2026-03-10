package com.trupti.vo;

import com.trupti.dto.CustomerProfileDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileResponseVO {
	private CustomerProfileDTO responseVO;
	private String message;
}
