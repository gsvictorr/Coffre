package br.com.coffre.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthRequest(@NotBlank(message = "Email não pode ser nulo") 
@Size(min = 10, message = "Email não pode ter menos de 10 caracteres")String email, 
@NotBlank(message = "Senha não pode ser nula") @Size(min = 8, message = "Senha não pode ter menos de 8 caracteres.") String password) {

}