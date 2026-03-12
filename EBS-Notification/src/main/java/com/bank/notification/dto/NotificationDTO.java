package com.bank.notification.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {

    private Long notificationId;
    private Long customerId;
    private String notificationType;
    private String message;
    private String status;
    private LocalDateTime createdAt;

}