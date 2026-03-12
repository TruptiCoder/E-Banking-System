package com.bank.beneficiary.service;

import java.util.List;

import com.bank.beneficiary.dto.BeneficiaryDTO;

public interface BeneficiaryService {

    BeneficiaryDTO addBeneficiary(BeneficiaryDTO dto);

    List<BeneficiaryDTO> getCustomerBeneficiaries(Long customerId);

    BeneficiaryDTO activateBeneficiary(Long beneficiaryId);

    void deleteBeneficiary(Long beneficiaryId);

    Boolean validateBeneficiary(Long beneficiaryId);
}
