package com.trupti.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trupti.dto.ChangePasswordDTO;
import com.trupti.dto.ForgotPasswordRequestDTO;
import com.trupti.dto.LoginRequestDTO;
import com.trupti.dto.LoginResponseDTO;
import com.trupti.dto.RefreshTokenRequestDTO;
import com.trupti.dto.ResetPasswordDTO;
import com.trupti.service.AuthService;
import com.trupti.service.ForgotPasswordService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	private final ForgotPasswordService forgotPasswordService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request,
			HttpServletRequest httpRequest) {

		String ipAddress = httpRequest.getRemoteAddr();

		Optional<LoginResponseDTO> response = authService.login(request, ipAddress);

		if (response.isPresent())
			return ResponseEntity.ok(response.get());
		else
			return ResponseEntity.badRequest().build();
	}

	@PostMapping("/refresh")
	public ResponseEntity<LoginResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO request) {

		Optional<LoginResponseDTO> response = authService.refreshToken(request);

		if (response.isPresent())
			return ResponseEntity.ok(response.get());
		else
			return ResponseEntity.badRequest().build();
	}

	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO request) {

		boolean res = authService.changePassword(request);

		if (res)
			return ResponseEntity.ok("Password updated successfully");
		else
			return ResponseEntity.badRequest().body("Password is invalid or same as previous password!");
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
		return ResponseEntity.ok("Logout successful");
	}

	@PostMapping("/forgot-password/request-otp")
	public ResponseEntity<?> requestOtp(@RequestBody ForgotPasswordRequestDTO request) {

		boolean res =forgotPasswordService.generateOtp(request.getUsername());
		if(!res) return ResponseEntity.ok("Customer does not exists!");
		return ResponseEntity.ok("OTP sent to registered email");
	}

	@PostMapping("/forgot-password/reset")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO request) {

		String res = forgotPasswordService.resetPassword(request.getUsername(), request.getOtp(), request.getNewPassword());
		return ResponseEntity.ok(res);
	}
}
