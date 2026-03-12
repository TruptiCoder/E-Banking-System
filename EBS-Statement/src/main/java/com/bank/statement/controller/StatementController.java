package com.bank.statement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.statement.dto.StatementRequestDTO;
import com.bank.statement.dto.StatementResponseDTO;
import com.bank.statement.service.StatementService;
import java.io.IOException;


import jakarta.ws.rs.core.HttpHeaders;

@RestController
@RequestMapping("/api/statements")
public class StatementController {

    @Autowired
    private StatementService service;

    @PostMapping("/generate")
    public StatementResponseDTO generateStatement(
            @RequestBody StatementRequestDTO request) {

        return service.generateStatement(request);
    }
    @GetMapping("/{statementId}")
    public StatementResponseDTO getStatement(
            @PathVariable Long statementId) {

        return service.getStatement(statementId);
    }
    @GetMapping("/{accountId}/download")
    public ResponseEntity<byte[]> downloadStatement(
            @PathVariable Long accountId) throws IOException{

        byte[] file = service.downloadStatement(accountId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=statement.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }
}
