package br.com.coffre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.coffre.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    Company findByName (String name);
}
