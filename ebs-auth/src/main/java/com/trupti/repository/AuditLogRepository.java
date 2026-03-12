package com.trupti.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trupti.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

}
