package com.trupti.exception;


import feign.FeignException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	/**
	 * Handle custom AdminServiceException
	 */
	@ExceptionHandler(AdminServiceException.class)
	public ResponseEntity<Map<String, Object>> handleAdminServiceException(AdminServiceException ex) {

		Map<String, Object> response = new HashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("error", ex.getMessage());
		response.put("status", HttpStatus.BAD_REQUEST.value());

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Handle validation errors from @Valid DTOs
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {

		Map<String, Object> errors = new HashMap<>();

		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		Map<String, Object> response = new HashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("status", HttpStatus.BAD_REQUEST.value());
		response.put("errors", errors);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Handle constraint violations
	 */
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String, Object>> handleConstraintViolation(ConstraintViolationException ex) {

		Map<String, Object> response = new HashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("error", ex.getMessage());
		response.put("status", HttpStatus.BAD_REQUEST.value());

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Handle Feign client errors (when other services fail)
	 */
	@ExceptionHandler(FeignException.class)
	public ResponseEntity<Map<String, Object>> handleFeignException(FeignException ex) {

		Map<String, Object> response = new HashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("error", ex.getMessage());
		response.put("status", ex.status());

		return new ResponseEntity<>(response, HttpStatus.valueOf(ex.status()));
	}

	/**
	 * Handle any other unexpected exceptions
	 */
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {

		Map<String, Object> response = new HashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("error", ex.getMessage());
		response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}