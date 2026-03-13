package com.trupti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EbsCustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbsCustomerApplication.class, args);
	}

}
