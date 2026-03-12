package com.bank.fund.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.fund.entity.FundTransferEntity;

@Repository
public interface FundTransferRepository  extends JpaRepository<FundTransferEntity, Long>{

	   List<FundTransferEntity> findBySourceAccountIdInOrDestinationAccountIdIn(
	            List<Long> sourceAccountIds,
	            List<Long> destinationAccountIds
	    );
}
