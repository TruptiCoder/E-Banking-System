package com.bank.fund.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.fund.dto.AccountResponseDTO;
import com.bank.fund.dto.FundTransferRequestDTO;
import com.bank.fund.dto.FundTransferResponseDTO;
import com.bank.fund.dto.TransferStatusDTO;
import com.bank.fund.service.FundTransferService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class FundTransferController {

    private final FundTransferService service;

    @PostMapping("/initiate")
    public ResponseEntity<FundTransferResponseDTO> initiateTransfer(
            @RequestBody FundTransferRequestDTO request) {

        return ResponseEntity.ok(service.initiateTransfer(request));
    }

    @GetMapping("/{transferId}/status")
    public ResponseEntity<TransferStatusDTO> getTransferStatus(
            @PathVariable Long transferId) {

        return ResponseEntity.ok(service.getTransferStatus(transferId));
    }
    
    @GetMapping("/history/{customerId}")
    public ResponseEntity<List<FundTransferResponseDTO>> getTransferHistory(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                service.getTransferHistory(customerId)
        );
    }
    
    
}
