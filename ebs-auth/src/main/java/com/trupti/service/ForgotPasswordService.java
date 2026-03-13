package com.trupti.service;

public interface ForgotPasswordService {

	boolean generateOtp(String username);

	String resetPassword(String username, String otp, String newPassword);

}