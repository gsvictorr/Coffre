package br.com.coffre.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.coffre.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Product findByName(String name);
}
