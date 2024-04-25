package br.com.coffre.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.coffre.dto.company.CompanyRequest;
import br.com.coffre.dto.company.CompanyResponse;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.model.Company;
import br.com.coffre.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyResponse registerCompany(CompanyRequest companyRequest) {

        Company newCompany = companyRequest.convert(companyRequest);

        if (companyRepository.findByName(newCompany.getName()) != null) {
            throw new CompanyException("Essa empresa já está cadastrada.");
        }
        
        if(companyRepository.findByEmail(newCompany.getEmail()) != null){
            throw new CompanyException("Esse email já está associado a outra empresa.");
        }
        else {
            newCompany.setEnabled(true);
            companyRepository.save(newCompany);
            CompanyResponse companyResponse = new CompanyResponse(newCompany);
            return companyResponse;
        }
    }

}
