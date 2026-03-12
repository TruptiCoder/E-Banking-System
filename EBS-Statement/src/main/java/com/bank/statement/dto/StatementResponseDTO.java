package com.bank.statement.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatementResponseDTO {

    private Long statementId;
    private Long accountId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String fileUrl;
    private LocalDateTime generatedAt;

}