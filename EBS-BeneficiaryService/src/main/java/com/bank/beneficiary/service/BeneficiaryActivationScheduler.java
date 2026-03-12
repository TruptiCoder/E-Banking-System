package com.bank.beneficiary.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bank.beneficiary.entity.Beneficiary;
import com.bank.beneficiary.repository.BeneficiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BeneficiaryActivationScheduler {

    private final BeneficiaryRepository repository;

    @Scheduled(fixedRate = 60000) // runs every 1 minute
    public void activateBeneficiaries() {

        List<Beneficiary> pendingList = repository.findByStatus("PENDING");

        for (Beneficiary b : pendingList) {

            if (b.getCreatedAt().plusHours(12).isBefore(LocalDateTime.now())) {

                b.setStatus("ACTIVE");
                b.setActivatedAt(LocalDateTime.now());

                repository.save(b);
            }
        }
    }
}
