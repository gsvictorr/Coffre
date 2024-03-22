package br.com.coffre.dto.company;

import org.springframework.beans.BeanUtils;

import br.com.coffre.model.Company;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CompanyRequest (
    @NotNull(message = "O nome não pode ser nulo.") @NotBlank(message = "O nome não pode estar vazio.") @Size(min = 3, max = 25, message = "O nome deve ter pelo menos 3 letras.") String name, 
    @NotNull(message = "O email não pode ser nulo.") @NotBlank(message = "O email não pode estar vazio.") @Email(message = "Informe um email válido.") @Size(min = 10, max = 80, message = "O email deve conter entre 10 e 80 caracteres") String email
    ){
    
        public Company convert(@Valid CompanyRequest companyRequest) {
        Company company = new Company();
        BeanUtils.copyProperties(companyRequest, company);
        return company;
    }
}
