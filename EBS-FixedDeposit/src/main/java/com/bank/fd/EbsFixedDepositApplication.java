package com.bank.fd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EbsFixedDepositApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbsFixedDepositApplication.class, args);
	}

}
