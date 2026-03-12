package com.bank.beneficiary.controller;

import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.bank.beneficiary.dto.BeneficiaryDTO;
import com.bank.beneficiary.service.BeneficiaryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/beneficiaries")
@RequiredArgsConstructor

public class BeneficiaryController {

	private final BeneficiaryService service;
	
	@PostMapping
    public BeneficiaryDTO addBeneficiary(@RequestBody BeneficiaryDTO dto) {
        return service.addBeneficiary(dto);
    }

    @GetMapping("/{customerId}")
    public List<BeneficiaryDTO> getCustomerBeneficiaries(@PathVariable Long customerId) {
        return service.getCustomerBeneficiaries(customerId);
    }

    @PutMapping("/{beneficiaryId}/activate")
    public BeneficiaryDTO activateBeneficiary(@PathVariable Long beneficiaryId) {
        return service.activateBeneficiary(beneficiaryId);
    }

    @DeleteMapping("/{beneficiaryId}")
    public void deleteBeneficiary(@PathVariable Long beneficiaryId) {
        service.deleteBeneficiary(beneficiaryId);
    }

    @GetMapping("/{beneficiaryId}/validate")
    public Boolean validateBeneficiary(@PathVariable Long beneficiaryId) {
        return service.validateBeneficiary(beneficiaryId);
    }
}
