package br.com.coffre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.coffre.model.Company;
import br.com.coffre.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    

    Product findByNameAndCompany(String name, Company company);

    List<Product> findAllByCompany(Company company);

}
