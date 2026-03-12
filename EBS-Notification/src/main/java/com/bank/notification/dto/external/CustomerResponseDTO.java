package com.bank.notification.dto.external;

import lombok.Data;

@Data
public class CustomerResponseDTO {

    private CustomerDTO customerDTO;
    private String message;

}