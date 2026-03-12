package com.bank.statement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EbsStatementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbsStatementApplication.class, args);
	}

}
