package br.com.coffre.dto.user;


import org.springframework.beans.BeanUtils;

import br.com.coffre.config.role.UserRole;
import br.com.coffre.model.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequest (
    @NotNull(message = "O nome não pode ser nulo.") @NotBlank(message = "O nome não pode estar vazio.") @Size(min = 3, max = 25, message = "O nome deve ter pelo menos 3 letras.") String name,
        @NotNull(message = "O email não pode ser nulo.") @NotBlank(message = "O email não pode estar vazio.") @Email(message = "Informe um email válido.") @Size(min = 10, max = 80, message = "O email deve conter entre 10 e 80 caracteres") String email,
        @NotNull(message = "A senha não pode ser nula.") @NotBlank(message = "A senha não pode estar vazia.") @Size(min = 8, max = 64, message = "A senha deve conter no mínimo 8 caracteres") String password,
        UserRole role, @NotNull(message = "ID da empresa não pode ser nulo.")Long companyId){

        public User convert(@Valid UserRequest userRequest) {
        User user = new User();
        BeanUtils.copyProperties(userRequest, user);
        return user;
    }
    
}
