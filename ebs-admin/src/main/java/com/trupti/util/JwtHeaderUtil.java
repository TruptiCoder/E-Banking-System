package com.trupti.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class JwtHeaderUtil {

	private static final String CUSTOMER_ID_HEADER = "X-Customer-Id";
	private static final String ROLES_HEADER = "X-Roles";

	/**
	 * Extract customerId from gateway header
	 */
	public Long getCustomerId(HttpServletRequest request) {
		String customerId = request.getHeader(CUSTOMER_ID_HEADER);
		if (customerId == null) {
			return null;
		}
		return Long.parseLong(customerId);
	}

	/**
	 * Extract roles from gateway header
	 */
	public String getRoles(HttpServletRequest request) {
		return request.getHeader(ROLES_HEADER);
	}

	/**
	 * Check if user has ADMIN role
	 */
	public boolean isAdmin(HttpServletRequest request) {
		String roles = request.getHeader(ROLES_HEADER);
		return roles != null && roles.contains("ROLE_ADMIN");
	}
}