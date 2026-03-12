package com.bank.statement.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class StatementRequestDTO {

    private Long accountId;
    private LocalDate fromDate;
    private LocalDate toDate;

}
