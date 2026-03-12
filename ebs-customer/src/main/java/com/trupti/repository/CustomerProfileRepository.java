package com.trupti.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trupti.entity.CustomerProfile;


@Repository
public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {
	Optional<CustomerProfile> findByCustomerId(Long customerId);
}
