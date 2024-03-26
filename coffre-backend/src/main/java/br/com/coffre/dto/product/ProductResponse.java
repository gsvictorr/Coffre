package br.com.coffre.dto.product;

import br.com.coffre.model.Company;
import br.com.coffre.model.Product;

public record ProductResponse (Long id, String name, double price, Integer amount, Company company) {
    
    public ProductResponse(Product product){
        this(product.getId(), product.getName(), product.getPrice(), product.getAmount(), product.getCompany());
    }
}
