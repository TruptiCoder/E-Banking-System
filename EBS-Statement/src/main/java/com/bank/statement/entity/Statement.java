package com.bank.statement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="statements")
public class Statement {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	 private Long statementId;

	    private Long accountId;

	    private LocalDate fromDate;

	    private LocalDate toDate;

	    private String fileUrl;

	    private LocalDateTime generatedAt;
}
