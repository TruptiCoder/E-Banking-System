package com.trupti.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Value("${jwt.access-token-expiration}")
	private long accessTokenExpiration;

	@Value("${jwt.refresh-token-expiration}")
	private long refreshTokenExpiration;

	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public String generateAccessToken(Long customerId, String username) {

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + accessTokenExpiration);

		return Jwts.builder().setSubject(String.valueOf(customerId)).claim("username", username).setIssuedAt(now)
				.setExpiration(expiryDate).signWith(getSigningKey()).compact();
	}

	public String generateRefreshToken(Long customerId) {

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + refreshTokenExpiration);

		return Jwts.builder().setSubject(String.valueOf(customerId)).setIssuedAt(now).setExpiration(expiryDate)
				.signWith(getSigningKey()).compact();
	}

	public Claims extractClaims(String token) {

		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
	}

	public Long extractCustomerId(String token) {

		Claims claims = extractClaims(token);
		return Long.parseLong(claims.getSubject());
	}

	public boolean isTokenExpired(String token) {

		Date expiration = extractClaims(token).getExpiration();
		return expiration.before(new Date());
	}

	public boolean validateToken(String token) {

		try {
			extractClaims(token);
			return !isTokenExpired(token);
		} catch (Exception e) {
			return false;
		}
	}
}