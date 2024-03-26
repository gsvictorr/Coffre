package br.com.coffre.dto.company;

import br.com.coffre.model.Company;

public record CompanyResponse (Long id, String name, String email){

    public CompanyResponse(Company company){
        this(company.getId(), company.getName(), company.getEmail());
    }
    
}
