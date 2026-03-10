package com.trupti.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.ChangePasswordDTO;
import com.trupti.dto.LoginRequestDTO;
import com.trupti.dto.LoginResponseDTO;
import com.trupti.dto.RefreshTokenRequestDTO;
import com.trupti.service.AuthService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private final AuthService authService = null;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request,
			HttpServletRequest httpRequest) {

		String ipAddress = httpRequest.getRemoteAddr();

		Optional<LoginResponseDTO> response = authService.login(request, ipAddress);
		
		if(response.isPresent()) return ResponseEntity.ok(response.get());
		else return ResponseEntity.badRequest().build();
	}

	@PostMapping("/refresh")
	public ResponseEntity<LoginResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO request) {

		Optional<LoginResponseDTO> response = authService.refreshToken(request);
		
		if(response.isPresent()) return ResponseEntity.ok(response.get());
		else return ResponseEntity.badRequest().build();
	}

	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO request) {

		boolean res = authService.changePassword(request);
		
		if(res) return ResponseEntity.ok("Password updated successfully");
		else return ResponseEntity.badRequest().body("Password is invalid or same as previous password!");
	}

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/validate")
	public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String token) {

		String jwt = token.replace("Bearer ", "");

		boolean valid = authService.validateToken(jwt);

		return ResponseEntity.ok(valid);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout() {

		// In JWT systems logout usually handled client-side
		// Optional: add token blacklist if needed

		return ResponseEntity.ok("Logout successful");
	}
}
