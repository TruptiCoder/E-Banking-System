package com.trupti.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {

            @Override
            public void apply(RequestTemplate template) {

                ServletRequestAttributes attributes =
                        (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

                if (attributes == null) {
                    return;
                }

                HttpServletRequest request = attributes.getRequest();

                String authorization = request.getHeader("Authorization");
                String customerId = request.getHeader("X-Customer-Id");
                String roles = request.getHeader("X-Roles");

                if (authorization != null) {
                    template.header("Authorization", authorization);
                }

                if (customerId != null) {
                    template.header("X-Customer-Id", customerId);
                }

                if (roles != null) {
                    template.header("X-Roles", roles);
                }
            }
        };
    }
}