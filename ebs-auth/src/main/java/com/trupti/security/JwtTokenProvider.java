package com.trupti.security;

import com.trupti.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
	private final JwtUtil jwtUtil;

    public JwtTokenProvider(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String generateAccessToken(Customer customer) {

        return jwtUtil.generateAccessToken(
                customer.getCustomerId(),
                customer.getUsername()
        );
    }

    public String generateRefreshToken(Customer customer) {

        return jwtUtil.generateRefreshToken(
                customer.getCustomerId()
        );
    }

    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    public Long getCustomerId(String token) {
        return jwtUtil.extractCustomerId(token);
    }
}
