package com.bank.notification.dto;

import lombok.Data;

@Data
public class OtpNotificationRequest {

    private Long customerId;
    private String otp;

}