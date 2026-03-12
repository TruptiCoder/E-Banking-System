package com.bank.account.util;

import java.util.Random;

public class AccountNumberGenerator {

	public static String generateAccountNumber() {
		Random random = new Random();
		   long number = 1000000000L + random.nextInt(900000000);

	        return "ACC" + number;
	}
}
