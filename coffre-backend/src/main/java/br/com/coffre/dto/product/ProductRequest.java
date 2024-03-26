package br.com.coffre.dto.product;

import org.springframework.beans.BeanUtils;

import br.com.coffre.model.Product;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductRequest (
    @NotBlank @NotNull(message = "O nome não pode ser nulo.") @Size(min = 3, max = 60, message = "O nome do produto deve ter pelo menos 3 letras.")String name, 
double price, 
Integer amount){
    

    public Product convert (@Valid ProductRequest productRequest){
        Product product = new Product();
        BeanUtils.copyProperties(productRequest, product);
        return product;
    }
}
 