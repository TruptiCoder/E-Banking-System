package com.trupti.service;

import java.util.Optional;

import com.trupti.dto.ChangePasswordDTO;
import com.trupti.dto.LoginRequestDTO;
import com.trupti.dto.LoginResponseDTO;
import com.trupti.dto.RefreshTokenRequestDTO;

public interface AuthService {

	Optional<LoginResponseDTO> login(LoginRequestDTO request, String ipAddress);

	Optional<LoginResponseDTO> refreshToken(RefreshTokenRequestDTO request);

	boolean changePassword(ChangePasswordDTO request);

	boolean validateToken(String token);

}