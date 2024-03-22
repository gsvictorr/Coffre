package br.com.coffre.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record TokenValidateRequest (@NotBlank String token) {
}
