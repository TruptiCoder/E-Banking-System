package com.bank.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EbsNotificationApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbsNotificationApplication.class, args);
	}

}
