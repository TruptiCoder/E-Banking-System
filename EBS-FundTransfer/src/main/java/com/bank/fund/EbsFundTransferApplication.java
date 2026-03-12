package com.bank.fund;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EbsFundTransferApplication {
  
	public static void main(String[] args) {
		SpringApplication.run(EbsFundTransferApplication.class, args);
	}

}
