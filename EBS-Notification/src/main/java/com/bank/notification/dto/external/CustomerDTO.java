package com.bank.notification.dto.external;

import lombok.Data;

@Data
public class CustomerDTO {

    private Long customerId;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String status;
	

}