package com.trupti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CredentialNotificationRequest {

    private Long customerId;
    private String username;
    private String temporaryPassword;

}
