package com.bank.fund.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferStatusDTO {
	 private Long transferId;
	    private String status;
}
