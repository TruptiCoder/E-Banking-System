package com.bank.beneficiary.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bank.beneficiary.client.CustomerServiceClient;
import com.bank.beneficiary.dto.BeneficiaryDTO;
import com.bank.beneficiary.entity.Beneficiary;
import com.bank.beneficiary.repository.BeneficiaryRepository;
import com.bank.beneficiary.vo.CustomerResponseVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BeneficaryServiceImpl implements BeneficiaryService {

	
	private final BeneficiaryRepository repository;
    private final ModelMapper mapper;
    private final CustomerServiceClient customerServiceClient;

	@Override
	public BeneficiaryDTO addBeneficiary(BeneficiaryDTO dto) {
		
		customerServiceClient.getCustomer(dto.getCustomerId());
        Beneficiary beneficiary = mapper.map(dto, Beneficiary.class);
        beneficiary.setBeneficiaryId(null);
        beneficiary.setStatus("PENDING");
        beneficiary.setCreatedAt(LocalDateTime.now());

        Beneficiary saved = repository.save(beneficiary);

        return mapper.map(saved, BeneficiaryDTO.class);
	}

	@Override
	public List<BeneficiaryDTO> getCustomerBeneficiaries(Long customerId) {
		CustomerResponseVO response = customerServiceClient.getCustomer(customerId);

	    if (response == null || response.getCustomerDTO() == null) {
	        throw new RuntimeException("Customer not found");
	        }
		return repository.findByCustomerId(customerId)
                .stream()
                .map(b -> mapper.map(b, BeneficiaryDTO.class))
                .collect(Collectors.toList());
	}
	
	@Override
	public BeneficiaryDTO activateBeneficiary(Long beneficiaryId) {
		 Beneficiary beneficiary = repository.findById(beneficiaryId)
	                .orElseThrow(() -> new RuntimeException("Beneficiary not found"));

	        beneficiary.setStatus("ACTIVE");
	        beneficiary.setActivatedAt(LocalDateTime.now());

	        Beneficiary saved = repository.save(beneficiary);

	        return mapper.map(saved, BeneficiaryDTO.class);
	}

	@Override
	public void deleteBeneficiary(Long beneficiaryId) {
		repository.deleteById(beneficiaryId);
		
	}

	@Override
	public Boolean validateBeneficiary(Long beneficiaryId) {
		Beneficiary beneficiary = repository.findById(beneficiaryId)
                .orElseThrow(() -> new RuntimeException("Beneficiary not found"));

        return "ACTIVE".equals(beneficiary.getStatus());
	}

}
