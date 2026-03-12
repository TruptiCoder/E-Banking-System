package com.bank.notification.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bank.notification.client.CustomerServiceClient;
import com.bank.notification.dto.CredentialNotificationRequest;
import com.bank.notification.dto.external.CustomerDTO;
import com.bank.notification.dto.external.CustomerResponseDTO;
import com.bank.notification.entity.NotificationEntity;
import com.bank.notification.kafka.event.BeneficiaryAddedEvent;
import com.bank.notification.kafka.event.FDCreatedEvent;
import com.bank.notification.kafka.event.FundTransferCompletedEvent;
import com.bank.notification.kafka.event.TransactionRecordedEvent;
import com.bank.notification.repository.NotificationRepository;
import com.bank.notification.service.email.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;
    private final CustomerServiceClient customerServiceClient;
   

    

public void sendCredentialsEmail(Long customerId, String username, String tempPassword) {

    CustomerResponseDTO response =
            customerServiceClient.getCustomerById(customerId);

    CustomerDTO customer = response.getCustomerDTO();

    
    String email = customer.getEmail();
    if (customer == null || customer.getEmail() == null) {
        throw new RuntimeException("Customer email not found for id: " + customerId);
    }

   

    String message = """
        Dear %s,

        Your banking account has been created successfully.

        Username: %s
        Temporary Password: %s

        Please login and change your password immediately.

        Thank you,
        Banking Support Team
        """.formatted(customer.getUsername(), username, tempPassword);

    emailService.sendEmail(
            email,
            "Your Banking Account Credentials",
            message
    );
}
    
    public void sendOtpToCustomer(Long customerId, String otp) {

        CustomerResponseDTO response =
                customerServiceClient.getCustomerById(customerId);

        CustomerDTO customer = response.getCustomerDTO();

        if (customer == null || customer.getEmail() == null) {
            throw new RuntimeException("Customer email not found");
        }

        String email = customer.getEmail();

        String message = """
            Dear %s,

            Your OTP for verification is: %s

            This OTP will expire in 5 minutes.

            Do not share this code with anyone.

            Thank you,
            Banking Security Team
            """.formatted(customer.getUsername(), otp);

        emailService.sendEmail(
                email,
                "Your OTP Verification Code",
                message
        );
    }
    
    public void handleFundTransferNotification(FundTransferCompletedEvent event) {

    	  Long customerId = event.getSourceAccountId(); // example mapping

    	  CustomerResponseDTO response =
    		        customerServiceClient.getCustomerById(customerId);

    		CustomerDTO customer = response.getCustomerDTO();

    		String email = customer.getEmail();

          String message = """
        	        Dear Customer,

        	        Your transfer of ₹%s from account %s was successful.

        	        Transaction ID: %s

        	        Thank you for banking with us.
        	        """.formatted(
        	                event.getAmount(),
        	                event.getSourceAccountId(),
        	                event.getTransferId()
        	        );

          saveNotification(message, "TRANSFER_SUCCESS");

          emailService.sendEmail(
                  email,
                  "Fund Transfer Successful",
                  message
          );
      }

    public void handleTransactionNotification(TransactionRecordedEvent event) {

        String message = "Transaction of ₹" + event.getAmount() +
                " recorded for account " + event.getAccountId();

        saveNotification(message, "TRANSACTION_ALERT");
    }

    public void handleBeneficiaryNotification(BeneficiaryAddedEvent event) {

        String message = "Beneficiary " + event.getBeneficiaryName() +
                " added successfully.";

        saveNotification(message, "BENEFICIARY_ADDED");
    }

    public void handleFDNotification(FDCreatedEvent event) {

        String message = "Fixed Deposit created with amount ₹" +
                event.getDepositAmount();

        saveNotification(message, "FD_CREATED");
    }

    private void saveNotification(String message, String type) {

        NotificationEntity notification = NotificationEntity.builder()
                .notificationType(type)
                .message(message)
                .status("SENT")
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }
}