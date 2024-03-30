package br.com.coffre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.coffre.model.Company;
import br.com.coffre.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    

    Product findByNameAndCompany(String name, Company company);

    Product findByIdAndCompany(Long id, Company company);

    List<Product> findAllByCompany(Company company);

}
