package com.trupti.security;

import org.springframework.stereotype.Component;

import com.trupti.dto.CustomerDTO;

@Component
public class JwtTokenProvider {
	private final JwtUtil jwtUtil;

	public JwtTokenProvider(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	public String generateAccessToken(CustomerDTO customer) {

		return jwtUtil.generateAccessToken(customer.getCustomerId(), customer.getUsername());
	}

	public String generateRefreshToken(CustomerDTO customer) {

		return jwtUtil.generateRefreshToken(customer.getCustomerId());
	}

	public boolean validateToken(String token) {
		return jwtUtil.validateToken(token);
	}

	public Long getCustomerId(String token) {
		return jwtUtil.extractCustomerId(token);
	}
}
