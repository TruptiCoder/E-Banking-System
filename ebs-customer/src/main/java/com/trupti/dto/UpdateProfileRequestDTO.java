package com.trupti.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequestDTO {
	private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    private String address;
    private String city;
    private String country;
    private String postalCode;
}
