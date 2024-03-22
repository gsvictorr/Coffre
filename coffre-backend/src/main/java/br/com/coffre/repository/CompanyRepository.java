package br.com.coffre.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.coffre.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    Company findByName (String name);
}
