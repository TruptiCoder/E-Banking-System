package com.bank.notification.dto;

import lombok.Data;

@Data
public class CredentialNotificationRequest {

    private Long customerId;
    private String username;
    private String temporaryPassword;

}
