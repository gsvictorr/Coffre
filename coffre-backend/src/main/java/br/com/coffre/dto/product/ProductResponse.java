package br.com.coffre.dto.product;

import br.com.coffre.model.Company;

public record ProductResponse (Long id, String name, double price, Integer amount, Company company) {
    
}
