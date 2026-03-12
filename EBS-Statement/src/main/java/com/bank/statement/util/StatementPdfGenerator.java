package com.bank.statement.util;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
public class StatementPdfGenerator {
	public static String generateStatementPdf(
            Long accountId,
            LocalDate fromDate,
            LocalDate toDate,
            List<?> transactions) {

        try {

            String folder = "statements/";
            new File(folder).mkdirs();

            String fileName = "statement_" + System.currentTimeMillis() + ".pdf";

            String path = folder + fileName;

            PdfWriter writer = new PdfWriter(path);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("BANK ACCOUNT STATEMENT"));
            document.add(new Paragraph("Account ID: " + accountId));
            document.add(new Paragraph("From: " + fromDate));
            document.add(new Paragraph("To: " + toDate));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Transactions:"));

            for (Object t : transactions) {
                document.add(new Paragraph(t.toString()));
            }

            document.close();

            return path;

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
