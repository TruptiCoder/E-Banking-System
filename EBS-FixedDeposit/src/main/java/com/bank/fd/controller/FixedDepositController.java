package com.bank.fd.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.fd.dto.CreateFdRequest;
import com.bank.fd.dto.FdDetailsResponse;
import com.bank.fd.dto.FixedDepositResponse;
import com.bank.fd.service.FixedDepositService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fd")
@RequiredArgsConstructor
public class FixedDepositController {

    private final FixedDepositService service;

    @PostMapping("/create")
    public ResponseEntity<FixedDepositResponse> createFd(
            @RequestBody CreateFdRequest request) {

        return ResponseEntity.ok(service.createdFd(request));
    }

    @GetMapping("/{customerId}")
    public List<FixedDepositResponse> getCustomerFds(
            @PathVariable Long customerId) {

        return service.getCustomerFds(customerId);
    }

    @GetMapping("/{fdId}/details")
    public FdDetailsResponse getFdDetails(
            @PathVariable Long fdId) {

        return service.getFdDetails(fdId);
    }

    @PutMapping("/{fdId}/close")
    public ResponseEntity<Void> closeFd(
            @PathVariable Long fdId) {

        service.closeFd(fdId);
        return ResponseEntity.ok().build();
    }
}
