package br.com.coffre.dto.product;

import org.springframework.beans.BeanUtils;

import br.com.coffre.model.Company;
import br.com.coffre.model.Product;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductAlterRequest (@NotNull(message = "O identificador do produto não pode ser nulo.") Long id, 
@NotBlank @NotNull(message = "O nome não pode ser nulo.") @Size(min = 3, max = 60, message = "O nome do produto deve ter pelo menos 3 letras.")String name, 
double price, 
Integer amount, 
Company company){
    

    public Product convert (@Valid ProductAlterRequest productAlterRequest){
        Product product = new Product();
        BeanUtils.copyProperties(productAlterRequest, product);
        return product;
    }
}
