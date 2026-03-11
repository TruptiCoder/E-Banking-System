package com.trupti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(auth -> auth

						// Admin endpoints require ADMIN role
						.requestMatchers("/api/admin/**").hasRole("ADMIN")

						// Allow actuator health checks
						.requestMatchers("/actuator/health").permitAll()

						// Everything else must be authenticated
						.anyRequest().authenticated())

				// No sessions (microservice)
				.sessionManagement(session -> session.sessionCreationPolicy(
						org.springframework.security.config.http.SessionCreationPolicy.STATELESS))

				.httpBasic(Customizer.withDefaults());

		return http.build();
	}
}