package com.ebs.dto;

import lombok.Data;

@Data
public class AccountResponse {
    private boolean exists =true;
    private Long AccountId;

}
