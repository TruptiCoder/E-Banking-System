package com.bank.gateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallBackController {

	@GetMapping("/accountServcieFallBack")
	public String accountServcieFallBackMethod() {
		return "Account Service Failed";
	}
}
